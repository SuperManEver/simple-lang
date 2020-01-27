import { Token } from './token'
import tokenize from './tokenize'

class Lexer {
  tokens: Token[]
  currentToken: number

  constructor (input: string) {
    this.tokens = tokenize(input)
    this.currentToken = 0
  }

  NextToken (): Token | null {
    const token = this.tokens[this.currentToken]

    this.currentToken++

    return token
  }

  hasMoreTokens (): boolean {
    return this.currentToken < this.tokens.length
  }
}

export default Lexer
