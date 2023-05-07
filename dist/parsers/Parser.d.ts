import { IParser, Date, ParsedResult } from '../types';
declare class Parser implements IParser {
    readonly name: string;
    readonly pattern: RegExp;
    constructor(name: string, pattern: RegExp);
    parse(date: Date): ParsedResult | undefined;
}
export default Parser;
