import {
  isLetter,
  isWhitespace,
  isNumber,
  isQuote,
  isKeyword,
  isComparison,
  comparisonType,
} from './identify'
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
  FUNCTION,
  keywords,
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

    if (isComparison(ch)) {
      let val = ch

      while (isComparison(input[++cursor])) {
        val += input[cursor]
      }

      const type = comparisonType[val]

      if (type) {
        tokens.push({
          type: type,
          value: val,
        })
      } else {
        throw new Error(`Unrecognized token provided ${val}`)
      }

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

    if (isLetter(ch)) {
      let symbol = ch

      while (isLetter(input[++cursor])) {
        symbol += input[cursor]
      }

      if (isKeyword(symbol)) {
        const keyword = keywords[symbol]

        if (keyword) {
          tokens.push({
            type: keyword,
            value: symbol,
          })

          continue
        }
      }

      tokens.push({
        type: IDENT,
        value: symbol,
      })

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
