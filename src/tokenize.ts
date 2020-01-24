import { isLetter, isWhitespace, isNumber, isQuote } from './identify'
import {
  Token,
  INT,
  PLUS,
  ASSIGN,
  LPAREN,
  RPAREN,
  LBRACE,
  RBRACE,
  COMMA,
  SEMICOLON,
  EOF,
  LET,
  IDENT,
} from './token'

export function tokenize (input: string): Token[] {
  const tokens: Token[] = []
  let cursor = 0

  while (cursor < input.length) {
    const ch = input[cursor]

    if (isWhitespace(ch)) {
      cursor++
      continue
    }

    if (ch === COMMA) {
      tokens.push({
        type: COMMA,
        value: ',',
      })

      cursor++
      continue
    }

    if (ch === SEMICOLON) {
      tokens.push({
        type: SEMICOLON,
        value: ';',
      })

      cursor++
      continue
    }

    if (ch === LPAREN) {
      tokens.push({
        type: LPAREN,
        value: '(',
      })

      cursor++
      continue
    }

    if (ch === RPAREN) {
      tokens.push({
        type: RPAREN,
        value: ')',
      })

      cursor++
      continue
    }

    if (ch === LBRACE) {
      tokens.push({
        type: LBRACE,
        value: '{',
      })

      cursor++
      continue
    }

    if (ch === RBRACE) {
      tokens.push({
        type: RBRACE,
        value: '}',
      })

      cursor++
      continue
    }

    if (isNumber(ch)) {
      let number = ch

      while (isNumber(input[++cursor])) {
        number += input[cursor]
      }

      tokens.push({
        type: INT,
        value: number,
      })

      continue
    }

    if (isLetter(ch)) {
      let symbol = ch

      while (isLetter(input[++cursor])) {
        symbol += input[cursor]
      }

      if (symbol === 'let') {
        tokens.push({
          type: LET,
          value: 'let',
        })

        continue
      }

      tokens.push({
        type: IDENT,
        value: symbol,
      })

      continue
    }

    if (ch === ASSIGN) {
      tokens.push({
        type: ASSIGN,
        value: '=',
      })

      cursor++
      continue
    }

    if (ch === PLUS) {
      tokens.push({
        type: PLUS,
        value: '+',
      })

      cursor++
      continue
    }

    if (isQuote(ch)) {
      let string = ''

      while (!isQuote(input[++cursor])) {
        string += input[cursor]
      }

      tokens.push({
        type: 'String',
        value: string,
      })

      cursor++
      continue
    }

    throw new Error(`${ch} is not valid`)
  }

  tokens.push({
    type: EOF,
    value: '',
  })

  return tokens
}

export default tokenize
