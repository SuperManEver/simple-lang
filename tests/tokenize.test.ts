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
  FUNCTION,
  LT,
  GT,
  EQ,
  NOT_EQ,
  IF,
  RETURN,
  TRUE,
  MULT,
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

// input := `
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

test('Tokenize: function expression & evaluation', () => {
  // let result = add(2, 3)

  const input = `
  let add = fn(x, y) {
    x + y
  }
  `
  const result = [
    {
      type: LET,
      value: 'let',
    },
    {
      type: IDENT,
      value: 'add',
    },
    {
      type: ASSIGN,
      value: '=',
    },
    {
      type: FUNCTION,
      value: 'fn',
    },
    {
      type: LPAREN,
      value: '(',
    },
    {
      type: IDENT,
      value: 'x',
    },
    {
      type: COMMA,
      value: ',',
    },
    {
      type: IDENT,
      value: 'y',
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
      type: IDENT,
      value: 'x',
    },
    {
      type: PLUS,
      value: '+',
    },
    {
      type: IDENT,
      value: 'y',
    },
    {
      type: RBRACE,
      value: '}',
    },
    {
      type: EOF,
      value: '',
    },
  ]

  expect(tokenize(input)).toEqual(result)
})

test('Tokenize larger expressions', () => {
  const input = 'let val = 15 + 28'
  const result = [
    {
      type: LET,
      value: 'let',
    },
    {
      type: IDENT,
      value: 'val',
    },
    {
      type: ASSIGN,
      value: '=',
    },
    {
      type: INT,
      value: '15',
    },
    {
      type: PLUS,
      value: '+',
    },
    {
      type: INT,
      value: '28',
    },
    {
      type: EOF,
      value: '',
    },
  ]

  expect(tokenize(input)).toEqual(result)
})

test('Tokenize call expression', () => {
  const input = 'let result = add(2, 3)'
  const result = [
    {
      type: LET,
      value: 'let',
    },
    {
      type: IDENT,
      value: 'result',
    },
    {
      type: ASSIGN,
      value: '=',
    },
    {
      type: IDENT,
      value: 'add',
    },
    {
      type: LPAREN,
      value: '(',
    },
    {
      type: INT,
      value: '2',
    },
    {
      type: COMMA,
      value: ',',
    },
    {
      type: INT,
      value: '3',
    },
    {
      type: RPAREN,
      value: ')',
    },
    {
      type: EOF,
      value: '',
    },
  ]

  expect(tokenize(input)).toEqual(result)
})

test('Tokenize lower & greater', () => {
  const input = '5 < 10 > 5;'
  const result = [
    {
      type: INT,
      value: '5',
    },
    {
      type: LT,
      value: '<',
    },
    {
      type: INT,
      value: '10',
    },
    {
      type: GT,
      value: '>',
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

test('Tokenize EQ', () => {
  const input = '5 == 5'
  const result = [
    {
      type: INT,
      value: '5',
    },
    {
      type: EQ,
      value: '==',
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

test('Tokenize NOT EQ', () => {
  const input = '5 != 5'
  const result = [
    {
      type: INT,
      value: '5',
    },
    {
      type: NOT_EQ,
      value: '!=',
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

test('multiply', () => {
  const input = 'let x = 12 * 3'
  const result = [
    {
      type: LET,
      value: 'let',
    },
    {
      type: IDENT,
      value: 'x',
    },
    {
      type: ASSIGN,
      value: '=',
    },
    {
      type: INT,
      value: '12',
    },
    {
      type: MULT,
      value: '*',
    },
    {
      type: INT,
      value: '3',
    },
    {
      type: EOF,
      value: '',
    },
  ]

  expect(tokenize(input)).toEqual(result)
})

test('if/else exp', () => {
  const input = `
  if (5 < 10) {
    return true;
  }
  `

  const result = [
    {
      type: IF,
      value: 'if',
    },
    {
      type: LPAREN,
      value: '(',
    },
    {
      type: INT,
      value: '5',
    },
    {
      type: LT,
      value: '<',
    },
    {
      type: INT,
      value: '10',
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
      type: RETURN,
      value: 'return',
    },
    {
      type: TRUE,
      value: 'true',
    },
    {
      type: SEMICOLON,
      value: ';',
    },
    {
      type: RBRACE,
      value: '}',
    },
    {
      type: EOF,
      value: '',
    },
  ]

  expect(tokenize(input)).toEqual(result)
})
