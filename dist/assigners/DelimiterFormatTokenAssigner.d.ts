import Token from '../parsers/Token';
import { IAssigner } from '../types';
declare class DelimiterFormatTokenAssigner implements IAssigner {
    readonly name: string;
    readonly type: string;
    readonly format?: string;
    constructor(name: string, type: string, format?: string);
    assign(token: Token): void;
}
export default DelimiterFormatTokenAssigner;
