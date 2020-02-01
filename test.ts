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

const input = 'if (x < y) { x * 19 } else { let result = y - 17 };'

const p = new Parser(input)

const prog = p.parseProgram()

// TODO: check errors
console.log(JSON.stringify(prog, null, 4))
