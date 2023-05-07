/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 273:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const parsers_1 = __importDefault(__webpack_require__(151));
const refiners_1 = __importDefault(__webpack_require__(863));
const assigners_1 = __webpack_require__(502);
class Guesser {
    constructor() { }
    static parse(date) {
        const parsedResults = [];
        parsers_1.default.forEach(parser => {
            const parsedResult = parser.parse(date);
            if (parsedResult) {
                parsedResults.push({ ...parsedResult });
            }
        });
        return parsedResults;
    }
    static refine(parsedResults) {
        let refinedParsedResults = [...parsedResults];
        refiners_1.default.forEach(refiner => {
            refinedParsedResults = [
                ...refiner.refine(refinedParsedResults)
            ];
        });
        return refinedParsedResults;
    }
    static assign(tokens, format) {
        let assigners = (!format || format === 'default') ? assigners_1.defaultAssigners : assigners_1.strftimeAssigners;
        assigners.forEach(assigner => {
            tokens.forEach(token => {
                assigner.assign(token);
            });
        });
    }
    static getFormatString(tokens) {
        let formatString = '';
        tokens.forEach(token => {
            if (token.format === 'NA') {
                throw Error(`Couldn't find strftime modifier for "${token.value}"`);
            }
            formatString += token.format ? token.format : token.value;
        });
        return formatString;
    }
}
exports["default"] = Guesser;


/***/ }),

/***/ 405:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class DayOfMonthFormatTokenAssigner {
    name;
    type;
    format;
    _map;
    constructor(name, type, format) {
        this.name = name;
        this.type = type;
        this.format = format;
        this._map = new Map();
        if (!format || format === 'default') {
            this._map.set(/\d{1,2}/, 'D');
            this._map.set(/\d{2}/, 'DD');
            this._map.set(/\d{1,2}(?:st|nd|rd|th)/, 'Do');
        }
        else {
            this._map.set(/\d{1,2}/, '%-e');
            this._map.set(/\d{2}/, '%d');
            this._map.set(/\d{1,2}(?:st|nd|rd|th)/, '%o');
        }
    }
    _testTokenType(token) {
        return token.type === this.type;
    }
    assign(token) {
        this._map.forEach((formatToken, pattern) => {
            if (this._testTokenType(token) && pattern.test(token.value)) {
                token.format = formatToken;
            }
        });
    }
}
exports["default"] = DayOfMonthFormatTokenAssigner;


/***/ }),

/***/ 162:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class DayOfWeekFormatTokenAssigner {
    name;
    type;
    format;
    _map;
    constructor(name, type, format) {
        this.name = name;
        this.type = type;
        this.format = format;
        this._map = new Map();
        if (!format || format === 'default') {
            this._map.set(/[0-6]/, 'd');
            this._map.set(/[0-6](?:st|nd|rd|th)/, 'do');
            this._map.set(/(?:Su|Mo|Tu|We|Th|Fr|Sa)/, 'dd');
            this._map.set(/(?:Sun|Mon|Tue|Wed|Thu|Fri|Sat)/, 'ddd');
            this._map.set(/(?:Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)/, 'dddd');
        }
        else {
            this._map.set(/[0-6]/, '%w');
            this._map.set(/[0-6](?:st|nd|rd|th)/, 'NA');
            this._map.set(/(?:Su|Mo|Tu|We|Th|Fr|Sa)/, 'NA');
            this._map.set(/(?:Sun|Mon|Tue|Wed|Thu|Fri|Sat)/, '%a');
            this._map.set(/(?:Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)/, '%A');
        }
    }
    _testTokenType(token) {
        return token.type === this.type;
    }
    assign(token) {
        this._map.forEach((formatToken, pattern) => {
            if (this._testTokenType(token) && pattern.test(token.value)) {
                token.format = formatToken;
            }
        });
    }
}
exports["default"] = DayOfWeekFormatTokenAssigner;


/***/ }),

/***/ 536:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class DayOfYearFormatTokenAssigner {
    name;
    type;
    format;
    _map;
    constructor(name, type, format) {
        this.name = name;
        this.type = type;
        this.format = format;
        this._map = new Map();
        if (!format || format === 'default') {
            this._map.set(/\d{1,3}/, 'DDD');
            this._map.set(/\d{3}/, 'DDDD');
            this._map.set(/\d{1,3}(?:st|nd|rd|th)/, 'DDDo');
        }
        else {
            this._map.set(/\d{1,3}/, 'NA');
            this._map.set(/\d{3}/, '%j');
            this._map.set(/\d{1,3}(?:st|nd|rd|th)/, 'NA');
        }
    }
    _testTokenType(token) {
        return token.type === this.type;
    }
    assign(token) {
        this._map.forEach((formatToken, pattern) => {
            if (this._testTokenType(token) && pattern.test(token.value)) {
                token.format = formatToken;
            }
        });
    }
}
exports["default"] = DayOfYearFormatTokenAssigner;


/***/ }),

/***/ 99:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class DelimiterFormatTokenAssigner {
    name;
    type;
    format;
    constructor(name, type, format) {
        this.name = name;
        this.format = format;
        this.type = type;
    }
    assign(token) { }
}
exports["default"] = DelimiterFormatTokenAssigner;


/***/ }),

/***/ 704:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class EscapeTextFormatTokenAssigner {
    name;
    type;
    format;
    constructor(name, type, format) {
        this.name = name;
        this.type = type;
        this.format = format;
    }
    _testTokenType(token) {
        return token.type === this.type;
    }
    assign(token) {
        if (this._testTokenType(token)) {
            token.format = (!this.format || this.format === 'default') ? `[${token.value}]` : token.value;
        }
    }
}
exports["default"] = EscapeTextFormatTokenAssigner;


/***/ }),

/***/ 668:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class ISODayOfWeekFormatTokenAssigner {
    name;
    type;
    format;
    _map;
    constructor(name, type, format) {
        this.name = name;
        this.type = type;
        this.format = format;
        this._map = new Map();
        if (!format || format === 'default') {
            this._map.set(/[1-7]/, 'E');
        }
        else {
            this._map.set(/[1-7]/, '%u');
        }
    }
    _testTokenType(token) {
        return token.type === this.type;
    }
    assign(token) {
        this._map.forEach((formatToken, pattern) => {
            if (this._testTokenType(token) && pattern.test(token.value)) {
                token.format = formatToken;
            }
        });
    }
}
exports["default"] = ISODayOfWeekFormatTokenAssigner;


/***/ }),

/***/ 391:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class ISOWeekOfYearFormatTokenAssigner {
    name;
    type;
    format;
    _map;
    constructor(name, type, format) {
        this.name = name;
        this.type = type;
        this.format = format;
        this._map = new Map();
        if (!format || format === 'default') {
            this._map.set(/\d{1,2}/, 'W');
            this._map.set(/\d{2}/, 'WW');
            this._map.set(/\d{1,2}(?:st|nd|rd|th)/, 'Wo');
        }
        else {
            this._map.set(/\d{1,2}/, 'NA');
            this._map.set(/\d{2}/, '%U');
            this._map.set(/\d{1,2}(?:st|nd|rd|th)/, 'NA');
        }
    }
    _testTokenType(token) {
        return token.type === this.type;
    }
    assign(token) {
        this._map.forEach((formatToken, pattern) => {
            if (this._testTokenType(token) && pattern.test(token.value)) {
                token.format = formatToken;
            }
        });
    }
}
exports["default"] = ISOWeekOfYearFormatTokenAssigner;


/***/ }),

/***/ 200:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class MeridiemFormatTokenAssigner {
    name;
    type;
    format;
    _map;
    constructor(name, type, format) {
        this.name = name;
        this.type = type;
        this.format = format;
        this._map = new Map();
        if (!format || format === 'default') {
            this._map.set(/am|pm/, 'a');
            this._map.set(/AM|PM/, 'A');
        }
        else {
            this._map.set(/am|pm/, '%P');
            this._map.set(/AM|PM/, '%p');
        }
    }
    _testTokenType(token) {
        return token.type === this.type;
    }
    assign(token) {
        this._map.forEach((formatToken, pattern) => {
            if (this._testTokenType(token) && pattern.test(token.value)) {
                token.format = formatToken;
            }
        });
    }
}
exports["default"] = MeridiemFormatTokenAssigner;


/***/ }),

/***/ 602:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class MillisecondFormatTokenAssigner {
    name;
    type;
    format;
    _map;
    constructor(name, type, format) {
        this.name = name;
        this.type = type;
        this.format = format;
        this._map = new Map();
        if (!format || format === 'default') {
            this._map.set(/\d/, 'S');
            this._map.set(/\d{2}/, 'SS');
            this._map.set(/\d{3}/, 'SSS');
        }
        else {
            this._map.set(/\d/, 'NA');
            this._map.set(/\d{2}/, 'NA');
            this._map.set(/\d{3}/, '%L');
        }
    }
    _testTokenType(token) {
        return token.type === this.type;
    }
    assign(token) {
        this._map.forEach((formatToken, pattern) => {
            if (this._testTokenType(token) && pattern.test(token.value)) {
                token.format = formatToken;
            }
        });
    }
}
exports["default"] = MillisecondFormatTokenAssigner;


/***/ }),

/***/ 84:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class MinuteFormatTokenAssigner {
    name;
    type;
    format;
    _map;
    constructor(name, type, format) {
        this.name = name;
        this.type = type;
        this.format = format;
        this._map = new Map();
        if (!format || format === 'default') {
            this._map.set(/\d{1,2}/, 'm');
            this._map.set(/\d{2}/, 'mm');
        }
        else {
            this._map.set(/\d{1,2}/, 'NA');
            this._map.set(/\d{2}/, '%M');
        }
    }
    _testTokenType(token) {
        return token.type === this.type;
    }
    assign(token) {
        this._map.forEach((formatToken, pattern) => {
            if (this._testTokenType(token) && pattern.test(token.value)) {
                token.format = formatToken;
            }
        });
    }
}
exports["default"] = MinuteFormatTokenAssigner;


/***/ }),

/***/ 337:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class MonthFormatTokenAssigner {
    name;
    type;
    format;
    _map;
    constructor(name, type, format) {
        this.name = name;
        this.type = type;
        this.format = format;
        this._map = new Map();
        if (!format || format === 'default') {
            this._map.set(/\d{1,2}/, 'M');
            this._map.set(/\d{2}/, 'MM');
            this._map.set(/\d{1,2}(?:st|nd|rd|th)/, 'Mo');
            this._map.set(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)$/, 'MMM');
            this._map.set(/^(January|February|March|April|May|June|July|August|September|October|November|December)$/, 'MMMM');
        }
        else {
            this._map.set(/\d{1,2}/, 'NA');
            this._map.set(/\d{2}/, '%m');
            this._map.set(/\d{1,2}(?:st|nd|rd|th)/, 'NA');
            this._map.set(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)$/, '%b');
            this._map.set(/^(January|February|March|April|May|June|July|August|September|October|November|December)$/, '%B');
        }
    }
    _testTokenType(token) {
        return token.type === this.type;
    }
    assign(token) {
        this._map.forEach((formatToken, pattern) => {
            if (this._testTokenType(token) && pattern.test(token.value)) {
                token.format = formatToken;
            }
        });
    }
}
exports["default"] = MonthFormatTokenAssigner;


/***/ }),

/***/ 765:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class SecondFormatTokenAssigner {
    name;
    type;
    format;
    _map;
    constructor(name, type, format) {
        this.name = name;
        this.type = type;
        this.format = format;
        this._map = new Map();
        if (!format || format === 'default') {
            this._map.set(/\d{1,2}/, 's');
            this._map.set(/\d{2}/, 'ss');
        }
        else {
            this._map.set(/\d{1,2}/, 'NA');
            this._map.set(/\d{2}/, '%S');
        }
    }
    _testTokenType(token) {
        return token.type === this.type;
    }
    assign(token) {
        this._map.forEach((formatToken, pattern) => {
            if (this._testTokenType(token) && pattern.test(token.value)) {
                token.format = formatToken;
            }
        });
    }
}
exports["default"] = SecondFormatTokenAssigner;


/***/ }),

/***/ 432:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class TimezoneFormatTokenAssigner {
    name;
    type;
    format;
    _map;
    constructor(name, type, format) {
        this.name = name;
        this.type = type;
        this.format = format;
        this._map = new Map();
        const abbreviatedTimezoneRegex = new RegExp('UT|'
            // https://www.timeanddate.com/time/zones/africa
            + 'CAT|CET|CVT|EAT|EET|GMT|MUT|RET|SAST|SCT|WAST|WAT|WEST|WET|WST|WT|'
            // https://www.timeanddate.com/time/zones/asia
            + 'ADT|AFT|ALMT|AMST|AMT|ANAST|ANAT|AQTT|AST|AZST|AZT|BNT|BST|BTT|CHOST|CHOT|'
            + 'CST|EEST|EET|GET|GST|HKT|HOVST|HOVT|ICT|IDT|IRDT|IRKST|IRKT|IST|JST|KGT|KRAST|'
            + 'KRAT|KST|MAGST|MAGT|MMT|MSK|MVT|NOVST|NOVT|NPT|OMSST|OMST|ORAT|PETST|PETT|PHT|'
            + 'PKT|PYT|QYZT|SAKT|SGT|SRET|TJT|TLT|TMT|TRT|ULAST|ULAT|UZT|VLAST|VLAT|WIB|WIT|'
            + 'YAKST|YAKT|YEKST|YEKT|'
            // https://www.timeanddate.com/time/zones/antarctica
            + 'ART|CAST|CEST|CLST|CLT|DAVT|DDUT|GMT|MAWT|NZDT|NZST|ROTT|SYOT|VOST|'
            // https://www.timeanddate.com/time/zones/atlantic
            + 'ADT|AST|AT|AZOST|AZOT|'
            // https://www.timeanddate.com/time/zones/au
            + 'ACDT|ACST|ACT|ACWST|AEDT|AEST|AET|AWDT|AWST|CXT|LHDT|LHST|NFDT|NFT|'
            // https://www.timeanddate.com/time/zones/caribbean
            + 'AST|AT|CDT|CIDST|CIST|CST|EDT|EST|ET|'
            // https://www.timeanddate.com/time/zones/ca
            + 'CST|CT|EST|ET|'
            // https://www.timeanddate.com/time/zones/eu
            + 'BST|CEST|CET|EEST|EET|FET|GET|GMT|IST|KUYT|MSD|MSK|SAMT|TRT|WEST|WET|'
            // https://www.timeanddate.com/time/zones/indian-ocean
            + 'CCT|EAT|IOT|TFT|'
            // https://www.timeanddate.com/time/zones/na
            + 'ADT|AKDT|AKST|AST|AT|CDT|CST|CT|EDT|EGST|EGT|ET|GMT|HDT|HST|MDT|MST|MT|NDT|NST|PDT|PMDT|PMST|PST|PT|WGST|WGT|'
            // https://www.timeanddate.com/time/zones/pacific
            + 'AoE|BST|CHADT|CHAST|CHUT|CKT|ChST|EASST|EAST|FJST|FJT|GALT|GAMT|GILT|HST|KOST|LINT|MART|'
            + 'MHT|NCT|NRT|NUT|NZDT|NZST|PGT|PHOT|PONT|PST|PWT|SBT|SST|TAHT|TKT|TOST|TOT|TVT|VUT|WAKT|WFT|WST|YAPT|'
            // https://www.timeanddate.com/time/zones/sa
            + 'ACT|AMST|AMT|ART|BOT|BRST|BRT|CLST|CLT|COT|ECT|FKST|FKT|FNT|GFT|GST|GYT|PET|PYST|PYT|SRT|UYST|UYT|VET|WARST');
        if (!format || format === 'default') {
            this._map.set(/[+-]\d{2}(?::\d{2})?/, 'Z');
            this._map.set(/[+-]\d{4}/, 'ZZ');
            // Treat these as escaped text
            this._map.set(/Z/, '[Z]');
            this._map.set(/z/, '[z]');
            this._map.set(abbreviatedTimezoneRegex, 'z');
        }
        else {
            this._map.set(/[+-]\d{2}(?::\d{2})?/, '%:z');
            this._map.set(/[+-]\d{4}/, '%z');
            // Treat these as escaped text
            this._map.set(/Z/, 'Z');
            this._map.set(/z/, 'z');
            this._map.set(abbreviatedTimezoneRegex, '%Z');
        }
    }
    _testTokenType(token) {
        return token.type === this.type;
    }
    assign(token) {
        this._map.forEach((formatToken, pattern) => {
            if (this._testTokenType(token) && pattern.test(token.value)) {
                token.format = formatToken;
            }
        });
    }
}
exports["default"] = TimezoneFormatTokenAssigner;


/***/ }),

/***/ 479:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class TwelveHourFormatTokenAssigner {
    name;
    type;
    format;
    _map;
    constructor(name, type, format) {
        this.name = name;
        this.type = type;
        this.format = format;
        this._map = new Map();
        if (!format || format === 'default') {
            this._map.set(/^([1-9]|1[0-2])$/, 'h');
            this._map.set(/^(0\d|1[0-2])$/, 'hh');
        }
        else {
            this._map.set(/^([1-9]|1[0-2])$/, '%-l');
            this._map.set(/^(0\d|1[0-2])$/, '%I');
        }
    }
    _testTokenType(token) {
        return token.type === this.type;
    }
    assign(token) {
        this._map.forEach((formatToken, pattern) => {
            if (this._testTokenType(token) && pattern.test(token.value)) {
                token.format = formatToken;
            }
        });
    }
}
exports["default"] = TwelveHourFormatTokenAssigner;


/***/ }),

/***/ 803:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class TwentyFourHourFormatTokenAssigner {
    name;
    type;
    format;
    _map;
    constructor(name, type, format) {
        this.name = name;
        this.type = type;
        this.format = format;
        this._map = new Map();
        if (!format || format === 'default') {
            this._map.set(/^(\d|1\d|2[0-3])$/, 'H');
            this._map.set(/^([0-1]\d|2[0-3])$/, 'HH');
        }
        else {
            this._map.set(/^(\d|1\d|2[0-3])$/, '%-k');
            this._map.set(/^([0-1]\d|2[0-3])$/, '%H');
        }
    }
    _testTokenType(token) {
        return token.type === this.type;
    }
    assign(token) {
        this._map.forEach((formatToken, pattern) => {
            if (this._testTokenType(token) && pattern.test(token.value)) {
                token.format = formatToken;
            }
        });
    }
}
exports["default"] = TwentyFourHourFormatTokenAssigner;


/***/ }),

/***/ 57:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class YearFormatTokenAssigner {
    name;
    type;
    format;
    _map;
    constructor(name, type, format) {
        this.name = name;
        this.type = type;
        this.format = format;
        this._map = new Map();
        if (!format || format === 'default') {
            this._map.set(/\d{2}/, 'YY');
            this._map.set(/\d{4}/, 'YYYY');
            this._map.set(/[+-]\d{6}/, 'YYYYYY');
        }
        else {
            this._map.set(/\d{2}/, '%y');
            this._map.set(/\d{4}/, '%Y');
            this._map.set(/[+-]\d{6}/, 'NA');
        }
    }
    _testTokenType(token) {
        return token.type === this.type;
    }
    assign(token) {
        this._map.forEach((formatToken, pattern) => {
            if (this._testTokenType(token) && pattern.test(token.value)) {
                token.format = formatToken;
            }
        });
    }
}
exports["default"] = YearFormatTokenAssigner;


/***/ }),

/***/ 502:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.strftimeAssigners = exports.defaultAssigners = void 0;
const YearFormatTokenAssigner_1 = __importDefault(__webpack_require__(57));
const MonthFormatTokenAssigner_1 = __importDefault(__webpack_require__(337));
const DayOfMonthFormatTokenAssigner_1 = __importDefault(__webpack_require__(405));
const DelimiterFormatTokenAssigner_1 = __importDefault(__webpack_require__(99));
const MinuteFormatTokenAssigner_1 = __importDefault(__webpack_require__(84));
const SecondFormatTokenAssigner_1 = __importDefault(__webpack_require__(765));
const MillisecondFormatTokenAssigner_1 = __importDefault(__webpack_require__(602));
const TimezoneFormatTokenAssigner_1 = __importDefault(__webpack_require__(432));
const DayOfYearFormatTokenAssigner_1 = __importDefault(__webpack_require__(536));
const EscapeTextFormatTokenAssigner_1 = __importDefault(__webpack_require__(704));
const ISODayOfWeekFormatTokenAssigner_1 = __importDefault(__webpack_require__(668));
const ISOWeekOfYearFormatTokenAssigner_1 = __importDefault(__webpack_require__(391));
const TwentyFourHourFormatTokenAssigner_1 = __importDefault(__webpack_require__(803));
const TwelveHourFormatTokenAssigner_1 = __importDefault(__webpack_require__(479));
const DayOfWeekFormatTokenAssigner_1 = __importDefault(__webpack_require__(162));
const MeridiemFormatTokenAssigner_1 = __importDefault(__webpack_require__(200));
const dayOfMonthFormatTokenAssigner = new DayOfMonthFormatTokenAssigner_1.default('DelimiterFormatTokenAssigner', 'dayOfMonth');
const dayOfWeekFormatTokenAssigner = new DayOfWeekFormatTokenAssigner_1.default('DayOfWeekFormatTokenAssigner', 'dayOfWeek');
const dayOfYearFormatTokenAssigner = new DayOfYearFormatTokenAssigner_1.default('DayOfYearFormatTokenAssigner', 'dayOfYear');
const delimiterFormatTokenAssigner = new DelimiterFormatTokenAssigner_1.default('DelimiterFormatTokenAssigner', 'delimiter');
const escapeTextFormatTokenAssigner = new EscapeTextFormatTokenAssigner_1.default('EscapeTextFormatTokenAssigner', 'escapeText');
const iSODayOfWeekFormatTokenAssigner = new ISODayOfWeekFormatTokenAssigner_1.default('ISODayOfWeekFormatTokenAssigner', 'isoDayOfWeek');
const iSOWeekOfYearFormatTokenAssigner = new ISOWeekOfYearFormatTokenAssigner_1.default('ISOWeekOfYearFormatTokenAssigner', 'isoWeekOfYear');
const meridiemFormatTokenAssigner = new MeridiemFormatTokenAssigner_1.default('MeridiemFormatTokenAssigner', 'meridiem');
const millisecondFormatTokenAssigner = new MillisecondFormatTokenAssigner_1.default('MillisecondFormatTokenAssigner', 'millisecond');
const minuteFormatTokenAssigner = new MinuteFormatTokenAssigner_1.default('MinuteFormatTokenAssigner', 'minute');
const monthFormatTokenAssigner = new MonthFormatTokenAssigner_1.default('MonthFormatTokenAssigner', 'month');
const secondFormatTokenAssigner = new SecondFormatTokenAssigner_1.default('SecondFormatTokenAssigner', 'second');
const timezoneFormatTokenAssigner = new TimezoneFormatTokenAssigner_1.default('TimezoneFormatTokenAssigner', 'timezone');
const twelveHourFormatTokenAssigner = new TwelveHourFormatTokenAssigner_1.default('TwelveHourFormatTokenAssigner', 'twelveHour');
const twentyFourHourFormatTokenAssigner = new TwentyFourHourFormatTokenAssigner_1.default('TwentyFourHourFormatTokenAssigner', 'twentyFourHour');
const yearFormatTokenAssigner = new YearFormatTokenAssigner_1.default('YearFormatTokenAssigner', 'year');
const strftimeDayOfMonthFormatTokenAssigner = new DayOfMonthFormatTokenAssigner_1.default('DelimiterFormatTokenAssigner', 'dayOfMonth', 'strftime');
const strftimeDayOfWeekFormatTokenAssigner = new DayOfWeekFormatTokenAssigner_1.default('DayOfWeekFormatTokenAssigner', 'dayOfWeek', 'strftime');
const strftimeDayOfYearFormatTokenAssigner = new DayOfYearFormatTokenAssigner_1.default('DayOfYearFormatTokenAssigner', 'dayOfYear', 'strftime');
const strftimeDelimiterFormatTokenAssigner = new DelimiterFormatTokenAssigner_1.default('DelimiterFormatTokenAssigner', 'delimiter', 'strftime');
const strftimeEscapeTextFormatTokenAssigner = new EscapeTextFormatTokenAssigner_1.default('EscapeTextFormatTokenAssigner', 'escapeText', 'strftime');
const strftimeISODayOfWeekFormatTokenAssigner = new ISODayOfWeekFormatTokenAssigner_1.default('ISODayOfWeekFormatTokenAssigner', 'isoDayOfWeek', 'strftime');
const strftimeISOWeekOfYearFormatTokenAssigner = new ISOWeekOfYearFormatTokenAssigner_1.default('ISOWeekOfYearFormatTokenAssigner', 'isoWeekOfYear', 'strftime');
const strftimeMeridiemFormatTokenAssigner = new MeridiemFormatTokenAssigner_1.default('MeridiemFormatTokenAssigner', 'meridiem', 'strftime');
const strftimeMillisecondFormatTokenAssigner = new MillisecondFormatTokenAssigner_1.default('MillisecondFormatTokenAssigner', 'millisecond', 'strftime');
const strftimeMinuteFormatTokenAssigner = new MinuteFormatTokenAssigner_1.default('MinuteFormatTokenAssigner', 'minute', 'strftime');
const strftimeMonthFormatTokenAssigner = new MonthFormatTokenAssigner_1.default('MonthFormatTokenAssigner', 'month', 'strftime');
const strftimeSecondFormatTokenAssigner = new SecondFormatTokenAssigner_1.default('SecondFormatTokenAssigner', 'second', 'strftime');
const strftimeTimezoneFormatTokenAssigner = new TimezoneFormatTokenAssigner_1.default('TimezoneFormatTokenAssigner', 'timezone', 'strftime');
const strftimeTwelveHourFormatTokenAssigner = new TwelveHourFormatTokenAssigner_1.default('TwelveHourFormatTokenAssigner', 'twelveHour', 'strftime');
const strftimeTwentyFourHourFormatTokenAssigner = new TwentyFourHourFormatTokenAssigner_1.default('TwentyFourHourFormatTokenAssigner', 'twentyFourHour', 'strftime');
const strftimeYearFormatTokenAssigner = new YearFormatTokenAssigner_1.default('YearFormatTokenAssigner', 'year', 'strftime');
exports.defaultAssigners = [
    yearFormatTokenAssigner,
    monthFormatTokenAssigner,
    dayOfMonthFormatTokenAssigner,
    delimiterFormatTokenAssigner,
    minuteFormatTokenAssigner,
    secondFormatTokenAssigner,
    millisecondFormatTokenAssigner,
    timezoneFormatTokenAssigner,
    dayOfYearFormatTokenAssigner,
    escapeTextFormatTokenAssigner,
    iSODayOfWeekFormatTokenAssigner,
    iSOWeekOfYearFormatTokenAssigner,
    twentyFourHourFormatTokenAssigner,
    twelveHourFormatTokenAssigner,
    dayOfWeekFormatTokenAssigner,
    meridiemFormatTokenAssigner,
];
exports.strftimeAssigners = [
    strftimeDayOfMonthFormatTokenAssigner,
    strftimeDayOfWeekFormatTokenAssigner,
    strftimeDayOfYearFormatTokenAssigner,
    strftimeDelimiterFormatTokenAssigner,
    strftimeEscapeTextFormatTokenAssigner,
    strftimeISODayOfWeekFormatTokenAssigner,
    strftimeISOWeekOfYearFormatTokenAssigner,
    strftimeMeridiemFormatTokenAssigner,
    strftimeMillisecondFormatTokenAssigner,
    strftimeMinuteFormatTokenAssigner,
    strftimeMonthFormatTokenAssigner,
    strftimeSecondFormatTokenAssigner,
    strftimeTimezoneFormatTokenAssigner,
    strftimeTwelveHourFormatTokenAssigner,
    strftimeTwentyFourHourFormatTokenAssigner,
    strftimeYearFormatTokenAssigner,
];


/***/ }),

/***/ 184:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Guesser_1 = __importDefault(__webpack_require__(273));
function guessFormat(date, format) {
    const parsedResults = Guesser_1.default.parse(date);
    const refinedParsedResults = Guesser_1.default.refine(parsedResults);
    if (refinedParsedResults.length === 0) {
        throw Error("Couldn't parse date");
    }
    refinedParsedResults.forEach(r => Guesser_1.default.assign(r.tokens, format));
    let matchedFormats = [];
    refinedParsedResults.forEach(r => matchedFormats.push(Guesser_1.default.getFormatString(r.tokens)));
    return (matchedFormats.length === 1
        ? matchedFormats[0]
        : matchedFormats);
}
exports["default"] = guessFormat;


/***/ }),

/***/ 375:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Token_1 = __importDefault(__webpack_require__(421));
class Parser {
    name;
    pattern;
    constructor(name, pattern) {
        this.name = name;
        this.pattern = pattern;
    }
    parse(date) {
        const match = this.pattern.exec(date);
        if (!match || !match.groups) {
            return;
        }
        let tokens = [];
        for (const [key, val] of Object.entries(match.groups)) {
            if (val) {
                tokens.push(new Token_1.default(val, /delim\d+/.test(key) ? 'delimiter' : key));
            }
        }
        return {
            tokens: tokens,
            index: match.index,
            parser: this.name,
        };
    }
}
exports["default"] = Parser;


/***/ }),

/***/ 421:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class Token {
    _value;
    _type;
    _format;
    /**
     * Constructor.
     */
    constructor(value, type) {
        this._value = value;
        this._type = type;
        this._format = '';
    }
    /**
     * Gets token value.
     *
     * @returns String
     */
    get value() {
        return this._value;
    }
    /**
     * Sets token value.
     *
     * @param String
     */
    set value(value) {
        this._value = value;
    }
    /**
     * Gets token type.
     *
     * @returns String
     */
    get type() {
        return this._type;
    }
    /**
     * Sets token type.
     *
     * @param String
     */
    set type(type) {
        this._type = type;
    }
    /**
     * Gets token format.
     *
     * @returns String
     */
    get format() {
        return this._format;
    }
    /**
     * Sets token format.
     *
     * @param String
     */
    set format(format) {
        this._format = format;
    }
}
exports["default"] = Token;


/***/ }),

/***/ 151:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Parser_1 = __importDefault(__webpack_require__(375));
const abbreviatedTimezones = 'UT|'
    // https://www.timeanddate.com/time/zones/africa
    + 'CAT|CET|CVT|EAT|EET|GMT|MUT|RET|SAST|SCT|WAST|WAT|WEST|WET|WST|WT|'
    // https://www.timeanddate.com/time/zones/asia
    + 'ADT|AFT|ALMT|AMST|AMT|ANAST|ANAT|AQTT|AST|AZST|AZT|BNT|BST|BTT|CHOST|CHOT|'
    + 'CST|EEST|EET|GET|GST|HKT|HOVST|HOVT|ICT|IDT|IRDT|IRKST|IRKT|IST|JST|KGT|KRAST|'
    + 'KRAT|KST|MAGST|MAGT|MMT|MSK|MVT|NOVST|NOVT|NPT|OMSST|OMST|ORAT|PETST|PETT|PHT|'
    + 'PKT|PYT|QYZT|SAKT|SGT|SRET|TJT|TLT|TMT|TRT|ULAST|ULAT|UZT|VLAST|VLAT|WIB|WIT|'
    + 'YAKST|YAKT|YEKST|YEKT|'
    // https://www.timeanddate.com/time/zones/antarctica
    + 'ART|CAST|CEST|CLST|CLT|DAVT|DDUT|GMT|MAWT|NZDT|NZST|ROTT|SYOT|VOST|'
    // https://www.timeanddate.com/time/zones/atlantic
    + 'ADT|AST|AT|AZOST|AZOT|'
    // https://www.timeanddate.com/time/zones/au
    + 'ACDT|ACST|ACT|ACWST|AEDT|AEST|AET|AWDT|AWST|CXT|LHDT|LHST|NFDT|NFT|'
    // https://www.timeanddate.com/time/zones/caribbean
    + 'AST|AT|CDT|CIDST|CIST|CST|EDT|EST|ET|'
    // https://www.timeanddate.com/time/zones/ca
    + 'CST|CT|EST|ET|'
    // https://www.timeanddate.com/time/zones/eu
    + 'BST|CEST|CET|EEST|EET|FET|GET|GMT|IST|KUYT|MSD|MSK|SAMT|TRT|WEST|WET|'
    // https://www.timeanddate.com/time/zones/indian-ocean
    + 'CCT|EAT|IOT|TFT|'
    // https://www.timeanddate.com/time/zones/na
    + 'ADT|AKDT|AKST|AST|AT|CDT|CST|CT|EDT|EGST|EGT|ET|GMT|HDT|HST|MDT|MST|MT|NDT|NST|PDT|PMDT|PMST|PST|PT|WGST|WGT|'
    // https://www.timeanddate.com/time/zones/pacific
    + 'AoE|BST|CHADT|CHAST|CHUT|CKT|ChST|EASST|EAST|FJST|FJT|GALT|GAMT|GILT|HST|KOST|LINT|MART|'
    + 'MHT|NCT|NRT|NUT|NZDT|NZST|PGT|PHOT|PONT|PST|PWT|SBT|SST|TAHT|TKT|TOST|TOT|TVT|VUT|WAKT|WFT|WST|YAPT|'
    // https://www.timeanddate.com/time/zones/sa
    + 'ACT|AMST|AMT|ART|BOT|BRST|BRT|CLST|CLT|COT|ECT|FKST|FKT|FNT|GFT|GST|GYT|PET|PYST|PYT|SRT|UYST|UYT|VET|WARST';
/**
 * Date only
 *
 * - 1 Jan
 * - 1 January
 * - 1st Jan
 * - 1st January
 * - 01 Jan
 * - 01 January
 *
 * Date with time
 *
 * - 1 Jan, 10:00 AM
 * - Sunday, 1st January, 23:00
 */
const dayOfMonthAndMonthNameDateFormatParser = new Parser_1.default('DayOfMonthAndMonthNameDateFormatParser', new RegExp('^'
    + '(?<dayOfWeek>(?:Sun?|Mon?|Tu(?:es)?|We(?:dnes)?|Th(?:urs)?|Fri?|Sa(?:tur)?)(?:day)?)?'
    + '(?<delim1>,)?'
    + '(?<delim2>\\s)?'
    + '(?<dayOfMonth>(?:3[0-1]|[1-2]\\d|0?[1-9])(?:st|nd|rd|th)?)'
    + '(?<delim3>\\s)'
    + '(?<month>Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|June?'
    + '|'
    + 'July?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)'
    + '(?<delim4>,)?'
    + '(?<delim5>\\s)?'
    + '(?<year>\\d{4}|\\d{2})?'
    + '(?:'
    + '(?<delim6>,)?'
    + '(?<delim7>\\s)'
    + '(?:(?<twentyFourHour>2[0-3]|0?\\d|1\\d)|(?<twelveHour>0?[1-9]|1[0-2]))'
    + '(?:'
    + '(?<delim8>[:.])'
    + '(?<minute>[0-5]\\d)'
    + ')?'
    + '(?:'
    + '(?<delim9>[:.])'
    + '(?<second>[0-5]\\d)'
    + ')?'
    + '(?:'
    + '(?<delim10>.)'
    + '(?<millisecond>\\d{3})'
    + ')?'
    + '(?<delim11>\\s)?'
    + '(?<meridiem>am|pm|AM|PM)?'
    + '(?:'
    + '(?<delim12>\\s)'
    + `(?<timezone>[+-]\\d{2}(?::?\\d{2})?|Z|${abbreviatedTimezones})`
    + ')?'
    + ')?'
    + '$'));
/**
 * ISO 8601
 * https://en.wikipedia.org/wiki/ISO_8601
 */
const iSO8601BasicDateTimeFormatParser = new Parser_1.default('ISO8601BasicDateTimeFormatParser', new RegExp('^'
    + '(?<year>[+-]\\d{6}|\\d{4})'
    + '(?:'
    + '(?<month>\\d{2})(?:(?<dayOfMonth>\\d{2}))?'
    + '|'
    + '(?<escapeText>W)(?<isoWeekOfYear>\\d{2})(?:(?<isoDayOfWeek>\\d))?'
    + '|'
    + '(?<dayOfYear>\\d{3})'
    + ')?'
    + '(?:'
    + '(?<delim1>T| )'
    + '(?:(?<twentyFourHour>\\d{2})(?:(?<minute>\\d{2})(?:(?<second>\\d{2})(?:(?<delim2>[.,])(?<millisecond>\\d{1,9}))?)?)?)'
    + '(?<timezone>[+-]\\d{2}(?::?\\d{2})?|Z)?'
    + ')?'
    + '$'));
/**
 * ISO 8601
 * https://en.wikipedia.org/wiki/ISO_8601
 */
const iSO8601ExtendedDateTimeFormatParser = new Parser_1.default('ISO8601ExtendedDateTimeFormatParser', new RegExp('^'
    + '(?<year>[+-]\\d{6}|\\d{4})'
    + '(?<delim1>\\-)'
    + '(?:'
    + '(?<month>\\d{2})(?:(?<delim2>\\-)(?<dayOfMonth>\\d{2}))?'
    + '|'
    + '(?<escapeText>W)(?<isoWeekOfYear>\\d{2})(?:(?<delim3>\\-)(?<isoDayOfWeek>\\d))?'
    + '|'
    + '(?<dayOfYear>\\d{3})'
    + ')'
    + '(?:'
    + '(?<delim4>T| )'
    + '(?:(?<twentyFourHour>\\d{2})(?:(?<delim5>:)(?<minute>\\d{2})(?:(?<delim6>:)(?<second>\\d{2})(?:(?<delim7>[.,])(?<millisecond>\\d{1,9}))?)?)?)'
    + '(?<timezone>[+-]\\d{2}(?::?\\d{2})?|Z)?'
    + ')?'
    + '$'));
/**
 * Date only
 *
 * - Jan 1
 * - January 1
 * - Jan 1st
 * - January 1st
 * - Jan 01
 * - January 01
 *
 * Date with time
 *
 * - Jan 1, 10:00 AM
 * - Sunday, January 1st, 23:00
 * - Sunday, January 1st, 23:00 PDT
 */
const monthNameAndDayOfMonthDateFormatParser = new Parser_1.default('MonthNameAndDayOfMonthDateFormatParser', new RegExp('^'
    + '(?<dayOfWeek>(?:Sun?|Mon?|Tu(?:es)?|We(?:dnes)?|Th(?:urs)?|Fri?|Sa(?:tur)?)(?:day)?)?'
    + '(?<delim1>,)?'
    + '(?<delim2>\\s)?'
    + '(?<month>Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|June?'
    + '|'
    + 'July?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)'
    + '(?<delim3>\\s)'
    + '(?<dayOfMonth>(?:3[0-1]|[1-2]\\d|0?[1-9])(?:st|nd|rd|th)?)'
    + '(?<delim4>,)?'
    + '(?<delim5>\\s)?'
    + '(?<year>\\d{4}|\\d{2})?'
    + '(?:'
    + '(?:'
    + '(?<delim6>,)?'
    + '(?<delim7>\\s)'
    + '(?:(?<twentyFourHour>2[0-3]|0?\\d|1\\d)|(?<twelveHour>0?[1-9]|1[0-2]))'
    + '(?:'
    + '(?<delim8>[:.])'
    + '(?<minute>[0-5]\\d)'
    + ')?'
    + '(?:'
    + '(?<delim9>[:.])'
    + '(?<second>[0-5]\\d)'
    + ')?'
    + '(?:'
    + '(?<delim10>.)'
    + '(?<millisecond>\\d{3})'
    + ')?'
    + '(?<delim11>\\s)?'
    + '(?<meridiem>am|pm|AM|PM)?'
    + '(?:'
    + '(?<delim12>\\s)'
    + `(?<timezone>[+-]\\d{2}(?::?\\d{2})?|Z|${abbreviatedTimezones})`
    + ')?'
    + ')?'
    + ')?'
    + '$'));
/**
 * RFC 2822
 * https://tools.ietf.org/html/rfc2822#section-3.3
 */
const rFC2822DateTimeFormatParser = new Parser_1.default('RFC2822DateTimeFormatParser', new RegExp('^'
    + '(?:(?<dayOfWeek>Mon|Tue|Wed|Thu|Fri|Sat|Sun)(?<delim1>,)?(?<delim2>\\s))?'
    + '(?<dayOfMonth>\\d{1,2})(?<delim3>\\s)(?<month>Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)(?<delim4>\\s)(?<year>\\d{2,4})'
    + '(?<delim5>\\s)'
    + '(?<twentyFourHour>\\d{2})(?<delim6>:)(?<minute>\\d{2})(?:(?<delim7>:)(?<second>\\d{2}))?'
    + '(?<delim8>\\s)'
    + '(?<timezone>(?:(?:UT|GMT|[ECMP][SD]T)|[Zz]|[+-]\\d{4}))'
    + '$'));
/*
 * YYYY/MM/DD [hh:mm a|A [abbr-tz]]
 * YYYY/M/D
 * YYYY/MM
 * YYYY/M
 */
const slashDelimitedDateTimeFormatParser = new Parser_1.default('SlashDelimitedDateFormatParser', new RegExp('^'
    + '(?<year>\\d{4}|\\d{2})'
    + '(?<delim1>[/.-])'
    + '(?<month>0?[1-9]|1[0-2])'
    + '(?:'
    + '(?<delim2>[/.-])'
    + '(?<dayOfMonth>0?[1-9]|[1-2]\\d|3[0-1])'
    + ')?'
    + '(?:'
    + '(?:'
    + '(?<delim3>,)?'
    + '(?<delim4>\\s)'
    + '(?:(?<twentyFourHour>2[0-3]|0?\\d|1\\d)|(?<twelveHour>0?[1-9]|1[0-2]))'
    + '(?:'
    + '(?<delim5>[:.])'
    + '(?<minute>[0-5]\\d)'
    + ')?'
    + '(?:'
    + '(?<delim6>[:.])'
    + '(?<second>[0-5]\\d)'
    + ')?'
    + '(?:'
    + '(?<delim7>.)'
    + '(?<millisecond>\\d{3})'
    + ')?'
    + '(?<delim8>\\s)?'
    + '(?<meridiem>am|pm|AM|PM)?'
    + '(?:'
    + '(?<delim9>\\s)'
    + `(?<timezone>[+-]\\d{2}(?::?\\d{2})?|Z|${abbreviatedTimezones})`
    + ')?'
    + ')?'
    + ')?'
    + '$'));
/**
 * hh:mm[AP]M
 * hh:mm[AP]M [abbr-tz]
 * hh[AP]M
 */
const twelveHourTimeFormatParser = new Parser_1.default('TwelveHourTimeFormatParser', new RegExp('^'
    + '(?<twelveHour>0?[1-9]|1[0-2])'
    + '(?:'
    + '(?<delim1>[:.])'
    + '(?<minute>[0-5]\\d)'
    + ')?'
    + '(?:'
    + '(?<delim2>[:.])'
    + '(?<second>[0-5]\\d)'
    + ')?'
    + '(?:'
    + '(?<delim3>.)'
    + '(?<millisecond>\\d{3})'
    + ')?'
    + '(?<delim4>\\s)?'
    + '(?<meridiem>am|pm|AM|PM)'
    + '(?:'
    + '(?<delim5>\\s)'
    + `(?<timezone>[+-]\\d{2}(?::?\\d{2})?|Z|${abbreviatedTimezones})`
    + ')?'
    + '$'));
/**
 * HH:mm:ss[.ddd]
 * HH:mm
 * HH.mm.ss Z
 */
const twentyFourHourTimeFormatParser = new Parser_1.default('TwentyFourHourTimeFormatParser', new RegExp('^'
    + '(?<twentyFourHour>2[0-3]|0?\\d|1\\d)'
    + '(?<delim1>[:.])'
    + '(?<minute>[0-5]\\d)'
    + '(?:'
    + '(?<delim2>[:.])'
    + '(?<second>[0-5]\\d)'
    + ')?'
    + '(?:'
    + '(?<delim3>.)'
    + '(?<millisecond>\\d{3})'
    + ')?'
    + '(?:'
    + '(?<delim4>\\s)'
    + `(?<timezone>[+-]\\d{2}(?::?\\d{2})?|Z|${abbreviatedTimezones})`
    + ')?'
    + '$'));
/*
 * UK style
 *
 * - DD/MM/YYYY
 * - D/M/YYYY
 * - DD/MM/YY
 * - DD/MM
 */
const uKStyleSlashDelimitedDateTimeFormatParser = new Parser_1.default('UKStyleSlashDelimitedDateFormatParser', new RegExp('^'
    + '(?<dayOfMonth>0?[1-9]|[1-2]\\d|3[0-1])'
    + '(?<delim1>[/.-])'
    + '(?<month>0?[1-9]|1[0-2])'
    + '(?:'
    + '(?<delim2>[/.-])'
    + '(?<year>\\d{4}|\\d{2})'
    + ')?'
    + '(?:'
    + '(?:'
    + '(?<delim3>,)?'
    + '(?<delim4>\\s)'
    + '(?:(?<twentyFourHour>2[0-3]|0?\\d|1\\d)|(?<twelveHour>0?[1-9]|1[0-2]))'
    + '(?:'
    + '(?<delim5>[:.])'
    + '(?<minute>[0-5]\\d)'
    + ')?'
    + '(?:'
    + '(?<delim6>[:.])'
    + '(?<second>[0-5]\\d)'
    + ')?'
    + '(?:'
    + '(?<delim7>.)'
    + '(?<millisecond>\\d{3})'
    + ')?'
    + '(?<delim8>\\s)?'
    + '(?<meridiem>am|pm|AM|PM)?'
    + '(?:'
    + '(?<delim9>\\s)'
    + `(?<timezone>[+-]\\d{2}(?::?\\d{2})?|Z|${abbreviatedTimezones})`
    + ')?'
    + ')?'
    + ')?'
    + '$'));
/*
 * US style
 *
 * - MM/DD/YYYY
 * - M/D/YYYY
 *
 * - MM/DD/YY
 * - M/D/YY
 *
 * - MM/DD
 * - M/D
 */
const uSStyleSlashDelimitedDateTimeFormatParser = new Parser_1.default('USStyleSlashDelimitedDateFormatParser', new RegExp('^'
    + '(?<month>0?[1-9]|1[0-2])'
    + '(?<delim1>[/.-])'
    + '(?<dayOfMonth>0?[1-9]|[1-2]\\d|3[0-1])'
    + '(?:'
    + '(?<delim2>[/.-])'
    + '(?<year>\\d{4}|\\d{2})'
    + ')?'
    + '(?:'
    + '(?:'
    + '(?<delim3>,)?'
    + '(?<delim4>\\s)'
    + '(?:(?<twentyFourHour>2[0-3]|0?\\d|1\\d)|(?<twelveHour>0?[1-9]|1[0-2]))'
    + '(?:'
    + '(?<delim5>[:.])'
    + '(?<minute>[0-5]\\d)'
    + ')?'
    + '(?:'
    + '(?<delim6>[:.])'
    + '(?<second>[0-5]\\d)'
    + ')?'
    + '(?:'
    + '(?<delim7>.)'
    + '(?<millisecond>\\d{3})'
    + ')?'
    + '(?<delim8>\\s)?'
    + '(?<meridiem>am|pm|AM|PM)?'
    + '(?:'
    + '(?<delim9>\\s)'
    + `(?<timezone>[+-]\\d{2}(?::?\\d{2})?|Z|${abbreviatedTimezones})`
    + ')?'
    + ')?'
    + ')?'
    + '$'));
const dashDelimitedWithMonthNameDateTimeFormatParser = new Parser_1.default('DashDelimitedWithMonthNameDateTimeFormatParser', new RegExp('^'
    + '(?<dayOfMonth>0?[1-9]|[1-2]\\d|3[0-1])'
    + '(?<delim1>-)'
    + '(?<month>Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|June?'
    + '|'
    + 'July?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)'
    + '(?<delim2>-)?'
    + '(?<year>\\d{4}|\\d{2})?'
    + '(?:'
    + '(?:'
    + '(?<delim3>,)?'
    + '(?<delim4>\\s)'
    + '(?:(?<twentyFourHour>2[0-3]|0?\\d|1\\d)|(?<twelveHour>0?[1-9]|1[0-2]))'
    + '(?:'
    + '(?<delim5>[:.])'
    + '(?<minute>[0-5]\\d)'
    + ')?'
    + '(?:'
    + '(?<delim6>[:.])'
    + '(?<second>[0-5]\\d)'
    + ')?'
    + '(?:'
    + '(?<delim7>.)'
    + '(?<millisecond>\\d{3})'
    + ')?'
    + '(?<delim8>\\s)?'
    + '(?<meridiem>am|pm|AM|PM)?'
    + '(?:'
    + '(?<delim9>\\s)'
    + `(?<timezone>[+-]\\d{2}(?::?\\d{2})?|Z|${abbreviatedTimezones})`
    + ')?'
    + ')?'
    + ')?'
    + '$'));
const parsers = [
    iSO8601ExtendedDateTimeFormatParser,
    iSO8601BasicDateTimeFormatParser,
    rFC2822DateTimeFormatParser,
    slashDelimitedDateTimeFormatParser,
    uKStyleSlashDelimitedDateTimeFormatParser,
    uSStyleSlashDelimitedDateTimeFormatParser,
    monthNameAndDayOfMonthDateFormatParser,
    dayOfMonthAndMonthNameDateFormatParser,
    twentyFourHourTimeFormatParser,
    twelveHourTimeFormatParser,
    dashDelimitedWithMonthNameDateTimeFormatParser,
];
exports["default"] = parsers;


/***/ }),

/***/ 24:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class StandardFormatParsersRefiner {
    name;
    constructor(name) {
        this.name = name;
    }
    refine(parsedResults) {
        const res = parsedResults.filter(r => {
            return r.parser === 'ISO8601ExtendedDateTimeFormatParser' ||
                r.parser === 'ISO8601BasicDateTimeFormatParser' ||
                r.parser === 'RFC2822DateTimeFormatParser';
        });
        if (res.length === 0) {
            return parsedResults;
        }
        return res;
    }
}
exports["default"] = StandardFormatParsersRefiner;


/***/ }),

/***/ 879:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class TimeFormatRefiner {
    name;
    constructor(name) {
        this.name = name;
    }
    refine(parsedResults) {
        parsedResults.forEach(r => {
            let meridiemExists = false;
            r.tokens.forEach(t => {
                if (t.type === 'meridiem') {
                    meridiemExists = true;
                }
            });
            if (meridiemExists) {
                r.tokens.forEach(t => {
                    if (t.type === 'twentyFourHour') {
                        t.type = 'twelveHour';
                    }
                });
            }
        });
        return parsedResults;
    }
}
exports["default"] = TimeFormatRefiner;


/***/ }),

/***/ 863:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const StandardFormatParsersRefiner_1 = __importDefault(__webpack_require__(24));
const TimeFormatRefiner_1 = __importDefault(__webpack_require__(879));
const timeFormatRefiner = new TimeFormatRefiner_1.default('TimeFormatRefiner');
const standardFormatParsersRefiner = new StandardFormatParsersRefiner_1.default('StandardFormatParsersRefiner');
const refiners = [
    standardFormatParsersRefiner,
    timeFormatRefiner,
];
exports["default"] = refiners;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(184);
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map