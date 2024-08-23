import { Statement } from "../Interfaces/Statement";
import { StatementContainer } from "./StatementContainer";
import { StatementVisitor } from "../Interfaces/Visitor";

export class ForStatement extends StatementContainer implements Statement {
    iterationCount: number

    constructor(statements: Statement[] = [], iterationCount: number) {
        super(statements);
        this.iterationCount = iterationCount;
    }

    public accept(visitor: StatementVisitor): void {
        visitor.doForStatement(this)
    }
}