import Parser from './src/parser'

const input = 'let x + = 5;'

const p = new Parser(input)

const prog = p.parseProgram()

// TODO: check errors
console.log(prog, p.errors)
