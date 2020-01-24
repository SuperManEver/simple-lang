export const LETTER = /[a-zA-Z]/
export const WHITESPACE = /\s+/
export const NUMBER = /^[0-9]+$/
export const OPERATORS = ['+', '-', '*', '/', '%']
export const DELIMETERS = [',', ';', '(', ')', '{', '}']

export const isDelimeter = (ch: string) => DELIMETERS.includes(ch)

export const isLetter = (character: string) => LETTER.test(character)

export const isWhitespace = (character: string) => WHITESPACE.test(character)

export const isNumber = (character: string) => NUMBER.test(character)

export const isOpeningParenthesis = (character: string) => character === '('

export const isClosingParenthesis = (character: string) => character === ')'

export const isPlusSign = (ch: string) => ch === '+'

export const isMinusSign = (ch: string) => ch === '-'

export const isMultiplySign = (ch: string) => ch === '*'

export const isDivideSign = (ch: string) => ch === '/'

export const isQuote = (character: string) => character === '"'

export const isSemi = (ch: string) => ch === ';'
