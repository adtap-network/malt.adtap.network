import { Readable } from 'stream';
import { CountryCode } from 'libphonenumber-js';

export interface MaltInterface {
    [key: string]: any;

    addslashes(str: string): string;
    
    amPm(v: string): string;

    arrayContains<T>(t: T[], v: T): boolean;
    
    arrayIndex<T>(a: T[], v: T): number;
    
    arrayLen<T>(t: T[]): number;

    arraySort(a: any[], t: 'numeric' | 'string', o: 'asc' | 'desc'): any[];

    asciiPeriod(): string;

    asciiPound(): string;

    asciiAmper(): string;

    asciiTab(): string;

    asciiCr(): string;

    asciiLf(): string;

    asciiCrlf(): string;

    asciiDquote(): string;

    asciiComma(): string;

    asciiSquote(): string;

    asciiSpace(): string;

    asciiDash(): string;

    asciiSemi(): string;

    asciiQmark(): string;

    asciiBslash(): string;

    asciiFslash(): string;

    asciiUnderscore(): string;

    byteConvert(n: number, u: string): string;

    calculateSpread(b: any, a: any): number;

    camelize(s: string): string;

    capitalizeFirst(s: string): string;
    
    cleanBreaks(t: string): string;

    cleanData(s: string): string;

    cleanEntryHtml(h: string): string;

    cleanFilename(f: string): string;

    cleanUrl(u: string): string;

    contains(needle: string, haystack: string): boolean;

    convertAscii(t: string): string;

	countKeys(): number;
  
    countStringTokens(s: string, delimiter: string): number;

    createDatePath(ps: string): string;

    createMalt(a: {[key: string]:any }): MaltInterface;

    createShort(t: string): string;

    createUuid(): string;

    dateAdd(unit: string, amount: number, date: Date): string;

    dateCompare(date1: string, date2: string): number;

    dateSubtract(u: string, a: number, d: string): string;

    day(d: string): number;

    dayAsString(d: string): string;

    dayOfWeek(d: string): number;

    dayOfYear(d: string): number;

    daysInMonth(d: string): number;

    decryptKey(t: string, k: string): string;

    deepReplace(search: string[], str: string): string;

    encryptKey(plaintext: string, keyStr: string): string;

    escBr(field: string): string;

    escDbString(t: string): string;

    escEmail(field: string): string;

    escHtml(field: string): string;

    escLike(field: string): string;

    escLog(f: string): string;

    escSql(b: string): string;

    escTextarea(field: string): string;

    escUrl(field: string): string;

    find(needle: string, haystack: string, startpos: number): number;

    floatToFraction(n: number, tolerance: number): { numerator: number, denominator: number, str_view: string } | false;

    formatCurrency(v: number | string): string;

    formatDate(v: string | Date): string;

    formatDecimal(v: number, precision: number): number;

    formatInteger(v: any): string;

    formatIssuer(v: string | null): string;

    formatLcase(v: string): string;

    formatLumens(v: any): number;

    formatMaxChars(v: string, n: number): string;

    formatPhone(phone: string): string;

    formatPlusPhone(phone: string, defaultCountry: CountryCode): string;

    formatStroops(v: number): string;

    formatTime(v: string | Date): string;

    formatTcase(v: string): string;

    formatTrecimal(value: number): number;

    formatUcase(v: string) : string;

    formatYesNo(b: boolean | number): string;

    generateCode(prefix: string): string;

    generateDesKey(): string;

    generateOrderNumber(): string;

    generatePassword(l: number): string;

    generateRandomString(l: number): string;
        
    getBase64Extension(t: string): string;

    getCgiValue(key: string): string | undefined;

    getClientAgent(): string | undefined;

    getColorspaceLabel(n: number): string;

    getDateBlog(d: string | Date): string;

    getDateCalendar(d: string | Date): string;

    getDateDashed(d: string | Date): string;

    getDateDigitsNow(): string;

    getDateEdition(d: string | Date): string;

    getDateKeyNow(): string;

    getDateLog(d: string | Date): string;

    getDateLong(d: string | Date): string;

    getDateMilitary(d: string | Date): string;

    getDateNow(): string;

	getDateRfc(d: string | Date): string;

    getDateShort(d: string | Date): string;

    getFixedSizeFromPercent(pct: number, total: number, pad: number): number;
    
    getFormattedDateTime(d: string): string;

    getGlobalConstant(d: string): any;

    getMatchingParen(str: string, startPos: number): number | undefined;
    
    getObjectByKey(a: {[key: string]: any}[], k: string, v: string | number | boolean): {[key: string]: any};

    getPrefixObject(p: string): {[key: string]: any};

	getPropertyValue(k: string): any;

    getShortDateNow(): string;

    getTimeLong(d: string | Date): string;

    getTimeShort(d: string | Date): string;

    hasProperty(k: string): boolean;
    
    hour(d: string): number;

    isAlphanum(s: string): number;

	isArray(v: any): boolean;
  
	isBoolean(v: any): boolean;
  
	isDate(v: any): boolean;
	
	isEmail(t: string): number;

    isFuture(time: string | Date): boolean;

	isJson(str: string): boolean;

    isLeapYear(d: string): boolean;

	isNumeric(v: any): boolean;
  
	isObject(v: any): boolean;

	isPast(time: string | Date): boolean;

    isSet(o: object, k: string): boolean;

    isSimple(value: unknown): boolean;

    isStellarPublic(v: string): number;

    isStellarSecret(v: string): number;

    isToday(time: string | Date): boolean;

    isUUID(value: string): boolean;

    isUsPhone(p: string): number;
	
	keysArray(): string[];

	lcase(t: string): string;

    left(s: string, n: number): string;

    len(str: string): number;

    listContains(fld: string, str: string, delims: string): number;

    listFind(list: string, value: string, delims: string): number;

    listFindNoCase(list: string, value: string, delims: string): number;

    listFirst(list: string, delims: string): string;

    listGetAt(list: string, pos: number, delims: string): string;

    listLast(list: string, delims: string): string;

    listProperties(): string[];

    listPropertyObjects(): Record<string, any>;

    menuCurrencies(): { [key: string]: string };

    menuHours(): { [key: string]: string };

    menuImages(): { [key: string]: string };

    menuLevels(): string[];

    menuMonths(): { [key: string]: string };

    menuSalutations(): { [key: string]: string };

    menuStates(): { [key: string]: string };
    
    menuTimes(): { [key: string]: string };

    menuYears(): { [key: number]: number };
    
    mergeArgs(a: Record<string, any>): void;
    
    mergeObjects(o1: {[key: string]: any}, o2: {[key: string]: any}): {[key: string]: any};

    mergeProperties(o: Record<string, any>): void;

    microtimeFloat(): number;

    minute(d: string): number;

    month(d: string): number;
    
    monthAbbrev(n: number): string;

    monthAsString(d: string): string;

    monthStringFromNumber(n: number): string;

	now(): number;

    numberFormat(number: number, decimals: number, decimalSeparator: string, thousandsSeparator: string): string;
    
    parseCoinAlpha(coinId: string): string;

    parseCoinCode(coinId: string): string;

    parseCoinIssuer(coinId: string): string;

    parseDate(x: string | Date): Date;

    plural(v: string): string;

    quotedArrayList(a: string[]): string;

    quotedValueList(l: string, d: string): string;

    safeDecrypt(m: string, s: string): string;

    safeEncrypt(plainText: string, secret: string): string;

    second(d: string): number;

    setDefaultProperty(k: string, v: unknown): void;

    setObjectPropertyValue(o: {[key: string]: any}, k: string, v: any): {[key: string]: any};

    setPropertyValue(k: string, v: any): void;

    singular(v: string): string;

    strReplace(search: string | string[], replace: string | string[], subject: string): string;

    thirtyDaysAgo(): string;

    thirtyDaysFromNow(): string;

    time(): number;

    titleCase(t: string): string;

    ucase(t: string): string;

    unset(key: string): void;

    week(date: string): string;

    year(d: string): number;

    yesNoFormat(b: boolean | number): string;

    yesterday(): string;

	zeroPad(t: string, l: number): string;

	zeroUnpad(t: string): string;
}