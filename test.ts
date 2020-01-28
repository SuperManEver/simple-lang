import Parser from './src/parser'

/*
5 + 5;
5 - 5;
5 * 5;
5 / 5;
5 > 5;
5 < 5;
5 == 5;
5 != 5;
*/

const input = '-6;'

const p = new Parser(input)

const prog = p.parseProgram()

// TODO: check errors
console.log(JSON.stringify(prog, null, 4))

// console.log(Precendence.LOWEST > Precendence.PRODUCT)
