import { ParsedResult, IRefiner } from '../types';
declare class StandardFormatParsersRefiner implements IRefiner {
    readonly name: string;
    constructor(name: string);
    refine(parsedResults: Array<ParsedResult>): Array<ParsedResult>;
}
export default StandardFormatParsersRefiner;
