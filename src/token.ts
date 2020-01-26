export type TokenType = string

export type Token = {
  type: TokenType
  value: string
}

export const ILLEGAL = 'ILLEGAL'
export const EOF = 'EOF'
// Identifiers + literals
export const IDENT = 'IDENT' // add, foobar, x, y, ...
export const INT = 'INT'
// 1343456
// Operators
export const ASSIGN = '='
export const PLUS = '+'
export const MINUS = '-'
export const BANG = '!'
export const MULT = '*'
export const DIVIDE = '/'
export const MOD = '%'

export const LT = '<'
export const GT = '>'

// Delimiters
export const COMMA = ','
export const SEMICOLON = ';'
export const LPAREN = '('
export const RPAREN = ')'
export const LBRACE = '{'
export const RBRACE = '}'

export const EQ = '=='
export const NOT_EQ = '!='

// Keywords
export const FUNCTION = 'FUNCTION'
export const LET = 'LET'
export const TRUE = 'TRUE'
export const FALSE = 'FALSE'
export const IF = 'IF'
export const ELSE = 'ELSE'
export const RETURN = 'RETURN'

export const keywords: { [k: string]: string | undefined } = {
  fn: FUNCTION,
  let: LET,
  true: TRUE,
  false: FALSE,
  if: IF,
  else: ELSE,
  return: RETURN,
}
