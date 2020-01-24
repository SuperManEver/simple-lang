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

// xdescribe(tokenize, () => {
//   it.skip('should return an array', () => {
//     expect(Array.isArray(tokenize(''))).toBe(true)
//   })

//   it.skip('should be able to tokenize a pair of parentheses', () => {
//     const input = '()'
//     const result = [
//       { type: 'Parenthesis', value: '(' },
//       { type: 'Parenthesis', value: ')' },
//     ]

//     expect(tokenize(input)).toEqual(result)
//   })

//   it.skip('should ignore whitespace completely', () => {
//     const input = '                  '
//     const result = []

//     expect(tokenize(input)).toEqual(result)
//   })

//   // Exercise 1 - Begin
//   it.skip('should correctly tokenize a single digit', () => {
//     const input = '2'
//     const result = [{ type: 'Number', value: 2 }]

//     expect(tokenize(input)).toEqual(result)
//   })

//   it.skip('should be able to handle single numbers in expressions', () => {
//     const input = '(1 2)'

//     const result = [
//       { type: 'Parenthesis', value: '(' },
//       { type: 'Number', value: 1 },
//       { type: 'Number', value: 2 },
//       { type: 'Parenthesis', value: ')' },
//     ]

//     expect(tokenize(input)).toEqual(result)
//   })

//   it.skip('should be able to handle single letters in expressions', () => {
//     const input = '(a b)'

//     const result = [
//       { type: 'Parenthesis', value: '(' },
//       { type: 'Name', value: 'a' },
//       { type: 'Name', value: 'b' },
//       { type: 'Parenthesis', value: ')' },
//     ]

//     expect(tokenize(input)).toEqual(result)
//   })
//   // Exercise 1: End

//   it.skip('should be able to handle multiple-digit numbers', () => {
//     const input = '(11 22)'

//     const result = [
//       { type: 'Parenthesis', value: '(' },
//       { type: 'Number', value: 11 },
//       { type: 'Number', value: 22 },
//       { type: 'Parenthesis', value: ')' },
//     ]

//     expect(tokenize(input)).toEqual(result)
//   })

//   // Exercise 2 Begin
//   it.skip('should correctly tokenize a simple expression', () => {
//     const input = '(add 2 3)'
//     const result = [
//       { type: 'Parenthesis', value: '(' },
//       { type: 'Name', value: 'add' },
//       { type: 'Number', value: 2 },
//       { type: 'Number', value: 3 },
//       { type: 'Parenthesis', value: ')' },
//     ]

//     expect(tokenize(input)).toEqual(result)
//   })

//   it.skip('should ignore whitespace', () => {
//     const input = '   (add    2 3)'
//     const result = [
//       { type: 'Parenthesis', value: '(' },
//       { type: 'Name', value: 'add' },
//       { type: 'Number', value: 2 },
//       { type: 'Number', value: 3 },
//       { type: 'Parenthesis', value: ')' },
//     ]

//     expect(tokenize(input)).toEqual(result)
//   })
//   // Exercise 2 End

//   it.skip('should know about strings', () => {
//     const input = '(log "hello" "world")'
//     const result = [
//       { type: 'Parenthesis', value: '(' },
//       { type: 'Name', value: 'log' },
//       { type: 'String', value: 'hello' },
//       { type: 'String', value: 'world' },
//       { type: 'Parenthesis', value: ')' },
//     ]

//     expect(tokenize(input)).toEqual(result)
//   })
// })
