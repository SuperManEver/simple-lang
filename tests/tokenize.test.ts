import tokenize from '../src/tokenize'
import {
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
} from '../src/token'

// TODO: input := `=+(){},;`

test('Tokenize 5 + 5', () => {
  const input = '5 + 5'
  const result = [
    {
      type: INT,
      value: '5',
    },
    {
      type: PLUS,
      value: '+',
    },
    {
      type: INT,
      value: '5',
    },
    {
      type: EOF,
      value: '',
    },
  ]

  expect(tokenize(input)).toEqual(result)
})

test('Tokenize =+(){},;', () => {
  const input = '=+(){},;'

  const result = [
    {
      type: ASSIGN,
      value: '=',
    },
    {
      type: PLUS,
      value: '+',
    },

    {
      type: LPAREN,
      value: '(',
    },
    {
      type: RPAREN,
      value: ')',
    },
    {
      type: LBRACE,
      value: '{',
    },
    {
      type: RBRACE,
      value: '}',
    },
    {
      type: COMMA,
      value: ',',
    },
    {
      type: SEMICOLON,
      value: ';',
    },
    {
      type: EOF,
      value: '',
    },
  ]

  expect(tokenize(input)).toEqual(result)
})

// input := `let five = 5;
// let ten = 10;
// let add = fn(x, y) {
// x + y;
// };
// let result = add(five, ten);
// `

test('Tokenize let five = 5;', () => {
  const input = 'let five = 5;'
  const result = [
    {
      type: LET,
      value: 'let',
    },
    {
      type: IDENT,
      value: 'five',
    },
    {
      type: ASSIGN,
      value: '=',
    },
    {
      type: INT,
      value: '5',
    },
    {
      type: SEMICOLON,
      value: ';',
    },
    {
      type: EOF,
      value: '',
    },
  ]

  expect(tokenize(input)).toEqual(result)
})
