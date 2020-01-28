import Parser from './src/parser'

const input = 'let myVar = anotherVar;'

enum Precendence {
  LOWEST,
  EQUALS,
  LESSGREATER, // > or <
  SUM, // +
  PRODUCT, // *
  PREFIX, // -X or !X
  CALL, // myFunction(X)
}

const p = new Parser(input)

const prog = p.parseProgram()

// TODO: check errors
// console.log(JSON.stringify(prog, null, 4))

console.log(Precendence.LOWEST > Precendence.PRODUCT)
