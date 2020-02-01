import { bind } from 'decko'
import { isNaN } from 'lodash'

import {
  Program,
  Statement,
  LetStatement,
  Identifier,
  ReturnStatement,
  Expression,
  ExpressionStatement,
  IntegerLiteral,
  PrefixExpression,
  InfixExpression,
  BooleanExpression,
  IfExpression,
  BlockStatement,
} from './ast'

import {
  Token,
  EOF,
  LET,
  TokenType,
  IDENT,
  ASSIGN,
  SEMICOLON,
  RETURN,
  INT,
  BANG,
  MINUS,
  PLUS,
  DIVIDE,
  MULT,
  EQ,
  NOT_EQ,
  LT,
  GT,
  TRUE,
  FALSE,
  LPAREN,
  RPAREN,
  IF,
  LBRACE,
  RBRACE,
  ELSE,
} from './token'
import Lexer from './lexer'

type prefixParseFn = () => Expression
type infixParseFn = (exp: Expression) => Expression

enum Precendence {
  LOWEST,
  EQUALS,
  LESSGREATER, // > or <
  SUM, // +
  PRODUCT, // *
  PREFIX, // -X or !X
  CALL, // myFunction(X)
}

const PRECEDENCES: { [k: string]: number } = {
  [EQ]: Precendence.EQUALS,
  [NOT_EQ]: Precendence.EQUALS,
  [LT]: Precendence.LESSGREATER,
  [GT]: Precendence.LESSGREATER,
  [PLUS]: Precendence.SUM,
  [MINUS]: Precendence.SUM,
  [DIVIDE]: Precendence.PRODUCT,
  [MULT]: Precendence.PRODUCT,
}

class Parser {
  curToken: Token
  peekToken: Token
  lexer: Lexer
  errors: string[] = []
  prefixParseFns: { [k: string]: prefixParseFn | undefined } = {}
  infixParseFns: { [k: string]: infixParseFn | undefined } = {}

  constructor (input: string) {
    this.lexer = new Lexer(input)

    this.registerPrefix(IDENT, this.parseIdentifier)
    this.registerPrefix(INT, this.parseIntegerLiteral)
    this.registerPrefix(BANG, this.parsePrefixExpression)
    this.registerPrefix(MINUS, this.parsePrefixExpression)

    this.registerInfix(PLUS, this.parseInfixExpression)
    this.registerInfix(MINUS, this.parseInfixExpression)
    this.registerInfix(DIVIDE, this.parseInfixExpression)
    this.registerInfix(MULT, this.parseInfixExpression)
    this.registerInfix(EQ, this.parseInfixExpression)
    this.registerInfix(NOT_EQ, this.parseInfixExpression)
    this.registerInfix(LT, this.parseInfixExpression)
    this.registerInfix(GT, this.parseInfixExpression)
    this.registerPrefix(TRUE, this.parseBoolean)
    this.registerPrefix(FALSE, this.parseBoolean)
    this.registerPrefix(LPAREN, this.parseGroupedExpression)
    this.registerPrefix(IF, this.parseIfExpression)

    this.nextToken()
    this.nextToken()
  }

  nextToken (): void {
    this.curToken = this.peekToken

    if (this.lexer.hasMoreTokens()) {
      this.peekToken = this.lexer.NextToken()
    }
  }

  parseProgram (): Program | null {
    const program = new Program()

    while (!this.curTokenIs(EOF)) {
      const stmt = this.parseStatement()

      if (stmt) {
        program.addStatement(stmt)
      }

      this.nextToken()
    }

    return program
  }

  parseStatement (): Statement | null {
    switch (this.curToken.type) {
      case LET:
        return this.parseLetStatement()

      case RETURN:
        return this.parseReturnStatement()

      default:
        return this.parseExpressionStatement()
    }
  }

  parseExpressionStatement (): ExpressionStatement {
    const stmt = new ExpressionStatement()
    stmt.token = this.curToken

    stmt.expression = this.parseExpression(Precendence.LOWEST)

    if (this.peekTokenIs(SEMICOLON)) {
      this.nextToken()
    }
    return stmt
  }

  parseExpression (precendence: number): Expression {
    const prefix = this.prefixParseFns[this.curToken.type]

    if (prefix) {
      let leftExp = prefix()

      while (
        !this.peekTokenIs(SEMICOLON) &&
        precendence < this.peekPrecedence()
      ) {
        const infix = this.infixParseFns[this.peekToken.type]

        if (!infix) {
          return leftExp
        }

        this.nextToken()

        leftExp = infix(leftExp)
      }

      return leftExp
    }

    this.noPrefixParseFnError(this.curToken)
    return null
  }

  @bind
  parseIfExpression (): Expression {
    const expression = new IfExpression(this.curToken)

    if (!this.expectPeek(LPAREN)) {
      return null
    }

    this.nextToken()

    expression.condition = this.parseExpression(Precendence.LOWEST)

    if (!this.expectPeek(RPAREN)) {
      return null
    }

    if (!this.expectPeek(LBRACE)) {
      return null
    }

    expression.consequence = this.parseBlockStatement()

    if (this.peekTokenIs(ELSE)) {
      this.nextToken()

      if (!this.expectPeek(LBRACE)) {
        return null
      }

      expression.alternative = this.parseBlockStatement()
    }

    return expression
  }

  @bind
  parseBlockStatement (): BlockStatement {
    const block = new BlockStatement(this.curToken)

    this.nextToken()

    while (!this.curTokenIs(RBRACE) && !this.curTokenIs(EOF)) {
      const stmt = this.parseStatement()

      if (stmt !== null) {
        block.statements.push(stmt)
      }

      this.nextToken()
    }

    return block
  }

  @bind
  parsePrefixExpression (): Expression {
    const expression = new PrefixExpression(this.curToken, this.curToken.value)

    this.nextToken()

    expression.right = this.parseExpression(Precendence.PREFIX)

    return expression
  }

  @bind
  parseInfixExpression (left: Expression): Expression {
    const exp = new InfixExpression(this.curToken, this.curToken.value, left)

    const precendence = this.curPrecedence()

    this.nextToken()

    exp.right = this.parseExpression(precendence)

    return exp
  }

  noPrefixParseFnError (token: Token) {
    const msg = `no prefix parse function for ${token.value} found`
    this.addError(msg)
  }

  parseReturnStatement (): ReturnStatement {
    const stmt = new ReturnStatement()

    stmt.token = this.curToken

    this.nextToken()

    // TODO: We're skipping the expressions until we
    // encounter a semicolon
    while (!this.curTokenIs(SEMICOLON)) {
      this.nextToken()
    }

    return stmt
  }

  parseIdentifier = (): Expression => {
    return new Identifier({ token: this.curToken, value: this.curToken.value })
  }

  @bind
  parseIntegerLiteral (): Expression {
    const lit = new IntegerLiteral(this.curToken)

    const val: number = parseInt(this.curToken.value, 10)

    if (isNaN(val)) {
      this.addError(`could not parse ${this.curToken.value} as integer`)
      return null
    }

    lit.value = val

    return lit
  }

  @bind
  parseBoolean (): BooleanExpression {
    return new BooleanExpression(this.curToken, this.curTokenIs(TRUE))
  }

  @bind
  parseGroupedExpression (): Expression {
    this.nextToken()

    const exp = this.parseExpression(Precendence.LOWEST)

    if (!this.expectPeek(RPAREN)) {
      return null
    }

    return exp
  }

  parseLetStatement (): LetStatement {
    const stmt = new LetStatement()

    if (!this.expectPeek(IDENT)) {
      return null
    }

    stmt.name = new Identifier({
      token: this.curToken,
      value: this.curToken.value,
    })

    if (!this.expectPeek(ASSIGN)) {
      return null
    }

    // TODO: We're skipping the expressions until we
    // encounter a semicolon
    // while (!this.curTokenIs(SEMICOLON)) {
    //   this.nextToken()
    // }

    return stmt
  }

  curTokenIs (t: TokenType): boolean {
    return this.curToken.type === t
  }

  peekTokenIs (t: TokenType): boolean {
    return this.peekToken.type === t
  }

  expectPeek (t: TokenType): boolean {
    if (this.peekTokenIs(t)) {
      this.nextToken()
      return true
    } else {
      this.peekError(t)
      return false
    }
  }

  peekError (t: TokenType): void {
    const msg = `expected next token to be ${t}, got ${this.peekToken.type} instead`

    this.addError(msg)
  }

  addError (msg: string) {
    this.errors.push(msg)
  }

  registerPrefix (tokenType: TokenType, fn: prefixParseFn) {
    this.prefixParseFns[tokenType] = fn
  }

  registerInfix (tokenType: TokenType, fn: infixParseFn) {
    this.infixParseFns[tokenType] = fn
  }

  peekPrecedence (): number {
    const p = PRECEDENCES[this.peekToken.type]

    if (p) {
      return p
    }

    return Precendence.LOWEST
  }

  curPrecedence (): number {
    const p = PRECEDENCES[this.curToken.type]

    if (p) {
      return p
    }

    return Precendence.LOWEST
  }
}

export default Parser
