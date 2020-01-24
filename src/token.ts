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
// Delimiters
export const COMMA = ','
export const SEMICOLON = ';'
export const LPAREN = '('
export const RPAREN = ')'
export const LBRACE = '{'
export const RBRACE = '}'
// Keywords
export const FUNCTION = 'FUNCTION'
export const LET = 'LET'
