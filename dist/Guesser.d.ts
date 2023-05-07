import Token from './parsers/Token';
import { Date, Format, ParsedResult } from './types';
export default class Guesser {
    constructor();
    static parse(date: Date): Array<ParsedResult>;
    static refine(parsedResults: Array<ParsedResult>): Array<ParsedResult>;
    static assign(tokens: Array<Token>, format?: string): void;
    static getFormatString(tokens: Array<Token>): Format;
}
