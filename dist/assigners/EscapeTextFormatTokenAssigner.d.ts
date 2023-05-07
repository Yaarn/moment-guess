import Token from '../parsers/Token';
import { IAssigner } from '../types';
declare class EscapeTextFormatTokenAssigner implements IAssigner {
    readonly name: string;
    readonly type: string;
    readonly format?: string;
    constructor(name: string, type: string, format?: string);
    private _testTokenType;
    assign(token: Token): void;
}
export default EscapeTextFormatTokenAssigner;
