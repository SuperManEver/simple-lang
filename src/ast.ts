import { Token, LET, RETURN } from './token'

interface INode {
  tokenLiteral: () => string
  toString(): string
}

export interface Statement {
  node: INode
  statementNode: () => void
}

export type Expression = {
  node: INode
  expressionNode: () => void
}

interface IProgram {
  statements: Statement[]
}

export class Program implements IProgram {
  statements: Statement[] = []

  addStatement (st: Statement): void {
    this.statements.push(st)
  }
}

interface IIdentifier extends Expression {
  token: Token
  value: string
}

export class Identifier implements IIdentifier {
  token: Token
  value: string

  constructor ({ token, value }: { token: Token; value: string }) {
    this.token = token
    this.value = value
  }

  get node () {
    return {
      tokenLiteral () {
        return 'Identifier'
      },
    }
  }

  expressionNode () {}
}

export class LetStatement implements Statement {
  token: Token
  value: Expression
  name: IIdentifier

  statementNode () {
    return LET
  }

  get node (): INode {
    return {
      tokenLiteral () {
        return 'LetStatement'
      },
    }
  }
}

// return <expression>;
export class ReturnStatement implements Statement {
  token: Token
  returnValue: Expression

  statementNode (): string {
    return RETURN
  }

  get node (): INode {
    return {
      tokenLiteral () {
        return 'ReturnStatement'
      },
    }
  }
}

export class ExpressionStatement implements Statement {
  token: Token
  expression: Expression
  node: INode

  statementNode (): string {
    return 'ExpressionStatement'
  }

  tokenLiteral (): string {
    return this.expression.node.tokenLiteral()
  }
}

export class IntegerLiteral implements Expression {
  token: Token
  value: number

  constructor (token: Token) {
    this.token = token
  }

  expressionNode () {}

  get node (): INode {
    return {
      tokenLiteral () {
        return 'IntegerLiteral'
      },
    }
  }
}

export class PrefixExpression implements Expression {
  token: Token
  operator: string
  right: Expression

  constructor (token: Token, operator: string) {
    this.token = token
    this.operator = operator
  }

  expressionNode () {}

  TokenLiteral () {
    return this.token.value
  }

  get node (): INode {
    return {
      tokenLiteral () {
        return 'PrefixExpression'
      },
    }
  }
}

export class InfixExpression implements Expression {
  token: Token
  left: Expression
  operator: string
  right: Expression

  constructor (token: Token, operator: string, left: Expression) {
    this.token = token
    this.operator = operator
    this.left = left
  }

  expressionNode () {}

  get node (): INode {
    return {
      tokenLiteral () {
        return 'InfixExpression'
      },
    }
  }
}

export class BooleanExpression implements Expression {
  token: Token
  value: boolean

  constructor (token: Token, value: boolean) {
    this.token = token
    this.value = value
  }

  expressionNode () {}

  TokenLiteral (): string {
    return `${this.value}`
  }

  get node (): INode {
    return {
      tokenLiteral () {
        return 'BooleanExpression'
      },
    }
  }
}

export class BlockStatement {
  token: Token // the { token
  statements: Statement[] = []

  constructor (token: Token) {
    this.token = token
  }

  statementNode (): void {}

  TokenLiteral (): string {
    return this.token.type
  }
}

export class IfExpression implements Expression {
  token: Token
  condition: Expression
  consequence: BlockStatement
  alternative: BlockStatement

  constructor (token: Token) {
    this.token = token
  }

  expressionNode () {}

  get node (): INode {
    return {
      tokenLiteral () {
        return 'IfExpression'
      },
    }
  }
}

export class FunctionLiteral implements Expression {
  token: Token // The 'fn' token
  parameters: Identifier[] = []
  body: BlockStatement

  constructor (token: Token) {
    this.token = token
  }

  expressionNode () {}

  TokenLiteral (): string {
    return this.token.value
  }

  get node (): INode {
    return {
      tokenLiteral () {
        return 'FunctionLiteral'
      },
    }
  }
}
