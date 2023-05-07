import { ParsedResult, IRefiner } from '../types';
declare class TimeFormatRefiner implements IRefiner {
    readonly name: string;
    constructor(name: string);
    refine(parsedResults: Array<ParsedResult>): Array<ParsedResult>;
}
export default TimeFormatRefiner;
