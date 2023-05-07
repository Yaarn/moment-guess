export default class Token {
    private _value;
    private _type;
    private _format;
    /**
     * Constructor.
     */
    constructor(value: string, type: string);
    /**
     * Gets token value.
     *
     * @returns String
     */
    get value(): string;
    /**
     * Sets token value.
     *
     * @param String
     */
    set value(value: string);
    /**
     * Gets token type.
     *
     * @returns String
     */
    get type(): string;
    /**
     * Sets token type.
     *
     * @param String
     */
    set type(type: string);
    /**
     * Gets token format.
     *
     * @returns String
     */
    get format(): string;
    /**
     * Sets token format.
     *
     * @param String
     */
    set format(format: string);
}
