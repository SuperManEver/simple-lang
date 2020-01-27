import { Program, Statement, LetStatement, Identifier } from './ast'
import { Token, EOF, LET, TokenType, IDENT, ASSIGN, SEMICOLON } from './token'
import Lexer from './lexer'

class Parser {
  curToken: Token
  peekToken: Token
  lexer: Lexer
  errors: string[] = []

  constructor (input: string) {
    this.lexer = new Lexer(input)

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

  parseStatement (): Statement | null {
    switch (this.curToken.type) {
      case LET:
        return this.parseLetStatement()
      default:
        return null
    }
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
}

export default Parser
