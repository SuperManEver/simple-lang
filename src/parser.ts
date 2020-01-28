import {
  Program,
  Statement,
  LetStatement,
  Identifier,
  ReturnStatement,
  Expression,
  ExpressionStatement,
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
      const leftExp = prefix()
      return leftExp
    }

    return null
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
    while (!this.curTokenIs(SEMICOLON)) {
      this.nextToken()
    }

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
}

export default Parser
