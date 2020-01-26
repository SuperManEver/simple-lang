import * as prompt from 'inquirer'
import chalk from 'chalk'
import fs from 'fs'

// const { parseAndEvaluate } = require('./parse-and-evaluate');
import tokenize from './tokenize'

const repl = async () => {
  const [_, __, fname] = process.argv

  // console.log('REPL start', fname)

  fs.readFile(fname, 'utf8', function (err, contents) {
    if (err) {
      console.error(err)
    }

    console.log(tokenize(contents))
  })
}

if (require.main === module) {
  console.log(
    chalk.red(
      `Welcome to the ${chalk.bgYellow('Simple')} Programming Language`,
    ),
  )
  repl()
}

export default repl
