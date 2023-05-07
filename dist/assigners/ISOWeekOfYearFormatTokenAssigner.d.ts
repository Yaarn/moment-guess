import Token from '../parsers/Token';
import { IAssigner } from '../types';
declare class ISOWeekOfYearFormatTokenAssigner implements IAssigner {
    readonly name: string;
    readonly type: string;
    readonly format?: string;
    private _map;
    constructor(name: string, type: string, format?: string);
    private _testTokenType;
    assign(token: Token): void;
}
export default ISOWeekOfYearFormatTokenAssigner;
