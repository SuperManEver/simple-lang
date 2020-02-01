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

const input = 'fn(x, y) { x + y; }'

const p = new Parser(input)

const prog = p.parseProgram()

// TODO: check errors
console.log(JSON.stringify(prog, null, 4))
