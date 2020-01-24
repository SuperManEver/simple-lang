import {
  isLetter,
  isWhitespace,
  isNumber,
  // isParenthesis,
  isQuote,
} from './identify'
import { Token, INT, PLUS } from './token'

export function tokenize (input: string): Token[] {
  const tokens: Token[] = []
  let cursor = 0

  while (cursor < input.length) {
    const ch = input[cursor]

    // if (isParenthesis(ch)) {
    //   tokens.push({
    //     type: 'Parenthesis',
    //     value: ch,
    //   })
    //   cursor++
    //   continue
    // }

    if (isWhitespace(ch)) {
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

      // cursor++1
      continue
    }

    if (isLetter(ch)) {
      let symbol = ch

      while (isLetter(input[++cursor])) {
        symbol += input[cursor]
      }

      tokens.push({
        type: 'Name',
        value: symbol,
      })

      continue
    }

    if (ch === '+') {
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

  return tokens
}

export default tokenize
