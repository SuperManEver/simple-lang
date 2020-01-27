import Parser from './src/parser'

const input = 'let x = 5;'

const p = new Parser(input)

const prog = p.parseProgram()

console.log(prog)
