import Parser from '../src/parser'

test('let statement', () => {
  const input = 'let x = 5;'

  const result = {
    statements: [
      {
        name: {
          token: {
            type: 'IDENT',
            value: 'x',
          },
          value: 'x',
        },
      },
    ],
  }

  const parser = new Parser(input)
  const prog = parser.parseProgram()

  expect(prog).toEqual(result)
})
