import Parser from './src/parser'

const input = 'add(1, 2 * 3, 4 + 5);'

const p = new Parser(input)

const prog = p.parseProgram()

// TODO: check errors
console.log(JSON.stringify(prog, null, 4))
