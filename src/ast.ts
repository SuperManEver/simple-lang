import { Token, LET, RETURN } from './token'

interface INode {
  tokenLiteral: () => string
}

export interface Statement {
  node: INode
  statementNode: () => void
}

type Expression = {
  Node: INode
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

interface IIdentifier {
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
