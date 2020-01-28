import Parser from './src/parser'

const input = 'let x = 5;'

const p = new Parser(input)

const prog = p.parseProgram()

// TODO: check errors
console.log(JSON.stringify(prog, null, 4))

// console.log(Precendence.LOWEST > Precendence.PRODUCT)
