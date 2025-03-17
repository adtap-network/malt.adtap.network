import crypto from 'crypto';
import { parsePhoneNumberFromString, CountryCode } from 'libphonenumber-js';
import MaltInterface from '../interfaces/malt';

export default class Malt implements MaltInterface {
    [key: string]: any;

    constructor(a: {[key: string]:any } = {}) { this.mergeArgs(a); }

    addslashes(str: string): string { return str.replace(/(['"\\])/g, '\\$1').replace(/\0/g, '\\0'); }
    
    amPm(v: string): string { const o = this.parseDate(v); const h = o.getHours(); return h >= 12 ? "pm" : "am"; }
  
    arrayContains<T>(t: T[], v: T): boolean { return t.includes(v); }
  
    arrayIndex<T>(a: T[], v: T): number { return a.indexOf(v); }
  
    arrayLen<T>(t: T[]): number { return t.length; }
  
    arraySort(a: any[], t: 'numeric' | 'string' = 'numeric', o: 'asc' | 'desc' = 'asc'): any[] {
      const na = [...a];    
      if (o === 'desc') {
        if (t === 'numeric') { na.sort((x, y) => y - x); }
        else { na.sort((x, y) => y.localeCompare(x)); }
      } 
      else {
        if (t === 'numeric') { na.sort((x, y) => x - y); } 
        else { na.sort((x, y) => x.localeCompare(y)); }
      }    
      return na;
    }

    asciiPeriod(): string { return String.fromCharCode(46); }

    asciiPound(): string { return String.fromCharCode(35); }

    asciiAmper(): string { return String.fromCharCode(38); }

    asciiTab(): string { return String.fromCharCode(9); }

    asciiCr(): string { return String.fromCharCode(13); }

    asciiLf(): string { return String.fromCharCode(10); }

    asciiCrlf(): string { return String.fromCharCode(13) + String.fromCharCode(10); }

    asciiDquote(): string { return String.fromCharCode(34); }

    asciiComma(): string { return String.fromCharCode(44); }

    asciiSquote(): string { return String.fromCharCode(39); }

    asciiSpace(): string { return String.fromCharCode(32); }

    asciiDash(): string { return String.fromCharCode(45); }

    asciiSemi(): string { return String.fromCharCode(59); }

    asciiQmark(): string { return String.fromCharCode(63); }

    asciiBslash(): string { return String.fromCharCode(92); }

    asciiFslash(): string { return String.fromCharCode(47); }

    asciiUnderscore(): string { return String.fromCharCode(95); }

    byteConvert(n: number, u: string = ""): string {
      if (!this.isNumeric(n) || n < 0) { return "Invalid size argument"; }
      const k = 1024;
      const m = 1048576;
      const g = 1073741824;
      let r = 0;  
      if (u === "") {
        if (n < k) { u = "bytes"; r = n; } 
        else if (n < m) { u = "KB"; r = n / k; } 
        else if (n < g) { u = "MB"; r = n / m; } 
        else { u = "GB"; r = n / g; }
      }
      return `${r.toFixed(2)} ${u}`;
    }

    calculateSpread(b: any, a: any): number {
      let bid = isNaN(Number(b)) ? 0 : Number(b);
      let ask = isNaN(Number(a)) ? 0 : Number(a);
      let spread = 0;    
      if (bid > 0 && ask > 0) { spread = this.formatTrecimal((ask - bid) / ask); }    
      return spread;
    }

    camelize(s: string): string {
        let t = "";
        const a = s.split('_');
        for(const k of a) {
            let v = this.capitalizeFirst(k);
            t += v;
        }
        return t;
    }

    capitalizeFirst(s: string): string { if(!s) return ''; return s.charAt(0).toUpperCase() + s.slice(1); }

    chr(ascii: number): string { return String.fromCharCode(ascii); }

    cleanBreaks(t: string): string { return t.replace(/(\r\n|\r|\n)/g, '').trim(); }

    cleanData(s: string): string {
      s = s.replace(/\t/g, '\\t');
      s = s.replace(/\r?\n/g, '\\n');
      if (s.includes('"')) { s = '"' + s.replace(/"/g, '""') + '"'; }
      return s;
    }

    cleanEntryHtml(h: string): string { return h.replace(/<!DOCTYPE html>|<\/?html>|<\/?head>|<\/?body>/g, "").trim(); }
    
    cleanFilename(f: string): string {
      f = f.trim();
      f = this.convertAscii(f);    
      const replacements: [string, string][] = [[' ', '_'], ['#', ''], ['&', ''], ["'", ''], ['"', ''], ['?', ''], [',', ''], ['\t', '_'], [';', ''], ['$', ''], ['*', ''], ['ú', '']];
      for (const [search, replace] of replacements) { f = f.replace(new RegExp(search, 'g'), replace); }
      return f.trim();
    }

    cleanUrl(u: string): string { u = u.replace('http://', '').replace('https://', ''); return u.trim(); }

    contains(needle: string, haystack: string): boolean { return haystack.toLowerCase().includes(needle.toLowerCase()); }

    convertAscii(t: string): string {
      const search = ['\u2018', '\u2019', '\u201C', '\u201D', '\u2013', '\u2014', '\u20AC', '\u00B7', '\u2026'];
      const replace = ["'", "'", '"', '"', '--', '---', '*', '*', '...'];
      for (let i = 0; i < search.length; i++) { t = t.replace(new RegExp(search[i], 'g'), replace[i]); }
      t = t.replace(/[^\x01-\x7F]/g, '');
      return t.trim();
    }

    countKeys(): number { return Object.keys(this).length; }
    
    countStringTokens(s: string, delimiter: string = ','): number { const tokens = s.split(delimiter); return tokens.length; }

    createDatePath(ps: string = '\\'): string { return this.year().toString() + ps + this.zeroPad(this.month().toString(), 2) + ps + this.zeroPad(this.day().toString(), 2); }

    createMalt(a: {[key: string]:any } = {}): MaltInterface { return new Malt(a); }

    createShort(t: string): string {
        let s = this.left(t.trim().toLowerCase().replace(/ /g, '-'), 36);
        if (this.right(s, 1) === '-') { s = this.left(s, s.length - 1); }
        return this.cleanFilename(s);
    }
  
    createUuid(): string { return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => { const r = (Math.random() * 16) | 0; return (c === "x" ? r : (r & 0x3) | 0x8).toString(16); }); }

    dateAdd(unit = 'day', amount = 1, date = new Date()): string {
        const timeUnits: { [key: string]: number } = { second: 1, minute: 60, hour: 3600, day: 86400, week: 604800, month: 2620800, quarter: 7862400, year: 31449600 };
        const dt = new Date(date).getTime() / 1000;
        const timeUnit = timeUnits[unit] || 86400;
        const increment = isNaN(amount) ? 1 : amount;
        const newTime = Math.ceil(dt + timeUnit * increment);
        const resultDate = new Date(newTime * 1000);
        return `${resultDate.getFullYear()}-${String(resultDate.getMonth() + 1).padStart(2, '0')}-${String(resultDate.getDate()).padStart(2, '0')} ${String(resultDate.getHours()).padStart(2, '0')}:${String(resultDate.getMinutes()).padStart(2, '0')}:${String(resultDate.getSeconds()).padStart(2, '0')}`;
    }

    dateCompare(date1: string, date2: string): number {
        const d1 = Date.now() - new Date(date1).getTime();
        const d2 = Date.now() - new Date(date2).getTime();    
        if (d1 < d2) { return -1; }
        else if (d1 > d2) { return 1; }
        else { return 0; }
    }

    dateSubtract(u: string = 'day', a: number = 1, d: string = 'now'): string {
        const units: { [key: string]: number } = { second: 1, minute: 60, hour: 3600, day: 86400, week: 604800, month: 2620800, quarter: 7862400, year: 31449600 };    
        let dt = new Date(d).getTime() / 1000;
        let unitInSeconds = units[u] ?? 86400;
        if (isNaN(a)) a = 1;    
        const t = Math.ceil(dt - (unitInSeconds * a));      
        const resultDate = new Date(t * 1000);
        const year = resultDate.getFullYear();
        const month = String(resultDate.getMonth() + 1).padStart(2, '0');
        const day = String(resultDate.getDate()).padStart(2, '0');
        const hours = String(resultDate.getHours()).padStart(2, '0');
        const minutes = String(resultDate.getMinutes()).padStart(2, '0');
        const seconds = String(resultDate.getSeconds()).padStart(2, '0');    
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    day(d: string = "now"): number { return this.parseDate(d).getDate(); }

    dayAsString(d: string = 'now'): string {
        const dayNumber = this.dayOfWeek(d);
        let dayString: string;
        switch(dayNumber) {
            case 1: dayString = 'Sunday'; break;
            case 2: dayString = 'Monday'; break;
            case 3: dayString = 'Tuesday'; break;
            case 4: dayString = 'Wednesday'; break;
            case 5: dayString = 'Thursday'; break;
            case 6: dayString = 'Friday'; break;
            case 7: dayString = 'Saturday'; break;
            default: dayString = ''; break;
        }    
        return dayString;
    }

    dayOfWeek(d: string = 'now'): number { const date = new Date(d); const day = date.getDay(); return day === 0 ? 7 : day; }

    dayOfYear(d: string = 'now'): number {
        const date = new Date(d);
        const startOfYear = new Date(date.getFullYear(), 0, 0);
        const diff = date.getTime() - startOfYear.getTime();
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay) + 1;
    }

    daysInMonth(d: string = 'now'): number {
        const month = this.month(d);
        const year = this.year(d);
        const lastDayOfMonth = new Date(year, month, 0);
        return lastDayOfMonth.getDate();
    }

    decryptKey(t: string, k: string): string {
        const algorithm = 'aes-256-ctr';
        const key = Buffer.from(k, 'utf8');
        const encryptedText = Buffer.from(t, 'base64');
        const ivLength = 16;
        const iv = encryptedText.subarray(0, ivLength);
        const encrypted = encryptedText.subarray(ivLength);    
        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        let decrypted = decipher.update(encrypted);
        decrypted = Buffer.concat([decrypted, decipher.final()]);    
        return decrypted.toString('utf8');
    }

    deepReplace(search: string[], str: string): string { search.forEach(s => { const regex = new RegExp(s, 'g'); str = str.replace(regex, ''); }); return str; }

    encryptKey(plaintext: string, keyStr: string): string {
        const algorithm = 'aes-256-ctr';
        const key = Buffer.from(keyStr, 'utf8');
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(algorithm, key, iv);
        let encrypted = cipher.update(plaintext, 'utf8');
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        const encryptedText = Buffer.concat([iv, encrypted]).toString('base64');
        return encryptedText;
    }

    escDbString(t: string): string {
        let j = JSON.stringify(t.trim());
        if (/(\\u[ed][0-9a-f]{3})/i.test(j)) {
            j = j.replace(/(\\u[ed][0-9a-f]{3})/gi, '\\$1');
            t = JSON.parse(j);
        }    
        return t.replace(/['"\\]/g, '\\$&');
    }

    escBr(field: string): string {
        field = field.replace(/<br\/><br\/><br\/><br\/>/g, '<br/><br/>');
        field = field.replace(/<\/li><br\/><br\/>/g, '</li>');
        field = field.replace(/<ol><br\/><br\/>/g, '<ol>');
        field = field.replace(/<ul><br\/><br\/>/g, '<ul>');
        field = field.replace(/<\/ol><br\/><br\/>/g, '</ol>');
        field = field.replace(/<\/ul><br\/><br\/>/g, '</ul>');
        field = field.replace(/<\/p><br\/><br\/>/g, '</p>');
        return field;
    }

    escEmail(field: string): string { return field.replace('@', ' [at] ').replace('.', ' [dot] '); }

    escHtml(field: string): string { return field ? field.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;') : ''; }

    escLike(field: string): string { return field.replace(/[%_]/g, (match) => `\\${match}`); }

    escLog(f: string): string { f = f.trim(); f = f.replace('\n', ''); f = f.replace('\r', ''); f = f.replace('  ', ' '); f = f.replace('\t', ' '); f = f.trim(); return f.replace(/'/g, "\\'"); }

    escSql(b: string): string { return b.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\0/g, '\\0'); }

    escTextarea(field: string): string { return field.replace(/'/g, '&apos;'); }

    escUrl(field: string): string { if (field === '') return field; let originalUrl = field; field = field.replace(/[^a-z0-9-~+_.?#=!&;,/:%@$\|*'()\\x80-\\xff]/gi, ''); const strip = ['%0d', '%0a', '%0D', '%0A']; field = this.deepReplace(strip, field); field = field.replace(';//', '://'); if (field.indexOf(':') === -1 && !['/', '#', '?'].includes(field[0]) && !/^[a-z0-9-]+?\.php/i.test(field)) { field = 'http://' + field; } return field; }

    find(needle: string, haystack: string, startpos: number = 0): number { const pos = haystack.toLowerCase().indexOf(needle.toLowerCase(), startpos); return pos === -1 ? 0 : pos + 1; }

    floatToFraction(n: number, tolerance: number = 1.e-9): { numerator: number, denominator: number, str_view: string } | false {
        let h1 = 1; let h2 = 0; let k1 = 0; let k2 = 1; let b = 1 / n;      
        do { b = 1 / b; const a = Math.floor(b); const aux = h1; h1 = a * h1 + h2; h2 = aux; const auxK = k1; k1 = a * k1 + k2; k2 = auxK; b = b - a; }
        while (Math.abs(n - h1 / k1) > n * tolerance);    
        if(h1 !== 0 && k1 !== 0) { return { numerator: h1, denominator: k1, str_view: `${h1}/${k1}`}; } 
        else { return false; }
    }

    formatCurrency(v: number | string): string {
        let n = v;
        const numValue = Number(v);
        if(numValue !== Number.POSITIVE_INFINITY && !isNaN(numValue)) { n = `$${numValue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`; }
        return n as string;
    }

    formatDate(v: string | Date): string {
        const date = new Date(v);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();    
        return `${month}/${day}/${year}`;
    }

    formatDecimal(v: number, precision: number = 2): number { return parseFloat(v.toFixed(precision)); }
    
    formatInteger(v: any): string { let n = '0'; if (!isNaN(v)) { n = Number(v).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }); } return n; }

    formatIssuer(v: string | null): string { let i = ''; if (v !== null) { i = v; if (this.isStellarPublic(v)) { i = this.left(v, 4) + '...' + this.right(v, 4); } } return i; }

    formatLcase(v: string): string { return v.toLowerCase(); }

    formatLumens(v: any): number { let n = v; if (v !== '∞') { n = Number(v).toFixed(7); } return n; }

    formatMaxChars(v: string, n: number = 30): string { return v.length <= n ? v : `${v.slice(0, n - 3)}...`; }

    formatPhone(phone: string): string {
        const cleaned = phone.replace(/\D/g, '');
        if(cleaned.length === 10) { return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3'); }
        if(cleaned.length > 10) { return '+' + cleaned; }
        return phone;
    }

    formatPlusPhone(phone: string, defaultCountry: CountryCode = 'US'): string {
        const phoneNumber = parsePhoneNumberFromString(phone, defaultCountry);
        if (phoneNumber) {
            return phoneNumber.formatInternational();
        }
        return phone;
    }

    formatStroops(v: number): string { return v.toFixed(8); }

    formatTime(v: string | Date): string { return this.getTimeShort(v); }

    formatTcase(v: string): string { return this.titleCase(v); }

    formatTrecimal(value: number): number { return parseFloat(value.toFixed(3)); }

    formatUcase(v: string) : string { return v.toUpperCase(); }

    formatYesNo(b: boolean | number): string { return this.yesNoFormat(b); }

    generateCode(prefix: string = 'CMMN'): string {
        if(prefix.length !== 4) { throw new Error('Prefix must be exactly 4 characters long.'); }    
        const rand5 = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000; 
        const rand4 = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        const rand3 = Math.floor(Math.random() * (999 - 100 + 1)) + 100;    
        const year = new Date().getFullYear();
        const month = this.zeroPad(Number(new Date().getMonth() + 1).toString(), 2);
        const day = this.zeroPad(Number(new Date().getDate()).toString(), 2);
        const hour = this.zeroPad(Number(new Date().getHours()).toString(), 2);    
        return `${prefix}${rand5}Y${year}M${month}${rand4}D${day}${rand3}H${hour}`;
    }

    generateDesKey(): string {
        let t = '';
        const v = 'aeuyAEUY';
        const c = 'bdghjmnpqrstvzBDGHJLMNPQRSTVWXZ';
        let a = Math.floor(Date.now() / 1000) % 2;      
        for (let i = 0; i < 8; i++) {
            if(a === 1) { t += c[Math.floor(Math.random() * c.length)]; a = 0; } 
            else { t += v[Math.floor(Math.random() * v.length)]; a = 1; }
        }
        return t.substring(0, 2);
    }

    generateOrderNumber(): string {
        const i = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000; 
        const n = this.generateRandomString(3);      
        const year = new Date().getFullYear();
        const month = String(new Date().getMonth() + 1).padStart(2, '0'); 
        const day = String(new Date().getDate()).padStart(2, '0');
        const hour = String(new Date().getHours()).padStart(2, '0');
        const minute = String(new Date().getMinutes()).padStart(2, '0');      
        return `${n.toUpperCase()}${year}${month}${day}${hour}${minute}${i}D`;
    }

    generatePassword(l: number = 8): string {
        const a = 'aeuyAEUYbdghjmnpqrstvzBDGHJLMNPQRSTVWXZ23456789';
        const n = a.length;
        let t = '';      
        for (let i = 0; i < l; i++) {
            let k = a[Math.floor(Math.random() * n)];
            if(i === 1 && /\d/.test(k)) { i--; } 
            else { t += k; }
        }    
        return t;
    }

    generateRandomString(l: number = 10): string {
        const s = 'abcdefghijklmnopqrstuvwxyz';
        const c = s.length;
        let r = '';      
        for (let i = 0; i < l; i++) { r += s[Math.floor(Math.random() * c)]; }
        return r;
    }

    getBase64Extension(t: string): string {
        let x = '';
        const l = t.substring(0, 12);
        if (l === 'data:image/p') { x = 'png'; }
        else if (l === 'data:image/g') { x = 'gif'; }
        else if (l === 'data:image/j') { x = 'jpg'; }
        return x;
    }

    getCgiValue(key: string): string | undefined { return process.env[key]; }

    getClientAgent(): string | undefined { return process.env['HTTP_USER_AGENT']; }

    getColorspaceLabel(n: number): string { const colorSpaceMap: { [key: number]: string } = { 1: 'MASKED', 2: '1BIT', 4: 'GREY', 8: 'PALETTE', 16: 'RGB', 17: 'RGB with mask', 32: 'CMYK', 33: 'CMYK with mask', 64: 'LAB', 128: 'RGBHIGH' }; return colorSpaceMap[n] || ''; }

    getDateBlog(d: string | Date): string { const date = new Date(d); const datePart = date.toISOString().split('T')[0]; const timePart = date.toTimeString().split(' ')[0]; return `${datePart}T${timePart}Z`; }

    getDateCalendar(d: string | Date): string { const date = new Date(d); return date.toISOString().split('T')[0]; }

    getDateDashed(d: string | Date): string { const date = new Date(d); return date.toISOString().split('T')[0]; }

    getDateDigitsNow(): string { const year = this.year(); const month = this.zeroPad(this.month().toString(), 2); const day = this.zeroPad(this.day().toString(), 2); return `${year}${month}${day}`; }

    getDateEdition(d: string | Date): string { const date = new Date(d); const day = date.toLocaleString('default', { weekday: 'short' }); const dayOfMonth = String(date.getDate()).padStart(2, '0'); const month = date.toLocaleString('default', { month: 'short' }); const year = date.getFullYear(); return `${day}, ${dayOfMonth} ${month} ${year}`; }

    getDateKeyNow(): string { const now = new Date(); const date = now.toISOString().split('T')[0]; return `date-${date}`; }

    getDateLog(d: string | Date): string { const date = new Date(d); const month = String(date.getMonth() + 1).padStart(2, '0'); const day = String(date.getDate()).padStart(2, '0'); const year = date.getFullYear(); const time = date.toTimeString().split(' ')[0]; return `${month}/${day}/${year} ${time}`; }

    getDateLong(d: string | Date): string { const date = new Date(d); const datePart = date.toISOString().split('T')[0]; const timePart = date.toTimeString().split(' ')[0]; return `${datePart} ${timePart}`; }

    getDateMilitary(d: string | Date): string { const date = new Date(d); const day = String(date.getDate()).padStart(2, '0'); const month = date.toLocaleString('default', { month: 'short' }); const year = date.getFullYear(); return `${day} ${month} ${year}`; }

    getDateNow(): string { const now = new Date(); const date = now.toISOString().split('T')[0]; const time = now.toTimeString().split(' ')[0]; return `${date} ${time}`; }

    getDateRfc(d: string | Date): string { const date = new Date(d); return date.toUTCString().replace('GMT', '+0000'); }

    getDateShort(d: string | Date): string { const date = new Date(d); const month = String(date.getMonth() + 1).padStart(2, '0'); const day = String(date.getDate()).padStart(2, '0'); const year = date.getFullYear(); return `${month}/${day}/${year}`; }

    getFixedSizeFromPercent(pct: number, total: number, pad: number = 0): number { const x = Math.floor((pct * total) / 100 - pad); return x; }

    getFormattedDateTime(d: string): string {
        const date = new Date(d);
        const formattedDate = date.toLocaleDateString('en-US');
        const formattedTime = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, }).toLowerCase(); 
        return `${formattedDate} at ${formattedTime}`;
    }

    getGlobalConstant(d: string): any { const v = (global as any)[d]; return v !== undefined ? v : false; }
    
    getMatchingParen(str: string, startPos: number): number | undefined { const count = str.length; let bracket = 1; for (let i = startPos; i < count; i++) { if (str[i] === '(') { bracket++; } else if (str[i] === ')') { bracket--; } if (bracket === 0) { return i; } } return undefined; }
    
    getObjectByKey(a: {[key: string]: any}[], k: string, v: string | number | boolean): {[key: string]: any} {
        let p = {};
        const l = a.length;
        for(let i=0; i<l; i++) {
            let r: {[key: string]: any} = a[i];
            if(r.hasOwnProperty(k)) {
                let x = r[k];
                if(x === v) { let p = r; break; }
            }
        }
        return p;
    }

    getPrefixObject(p: string): {[key: string]: any} { 
        let a: {[key: string]: any} = {}; 
        const ks = this.keysArray();
        for(let i=0; i<ks.length; i++) {
            let k = ks[i];
            let v = this[k];
            if(this.left(k, p.length) == p) { a[k] = v; }
        }
        return a;
    }

    getPropertyValue(k: string): any { return this.hasProperty(k) ? this[k] : ""; }

    getShortDateNow(): string { const date = new Date(); return date.toLocaleDateString('en-US'); }

    getTimeLong(d: string | Date): string { const date = new Date(d); return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, }); }

    getTimeShort(d: string | Date): string {
        const date = new Date(d);
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false, }); 
    }

    hasProperty(k: string): boolean { return Object.prototype.hasOwnProperty.call(this, k); }
    
    hour(d: string = "now"): number { return this.parseDate(d).getHours(); }

    isAlphanum(s: string): number { return /^[a-zA-Z0-9]+$/.test(s) ? 1 : 0; }

    isArray(v: any): boolean { return Array.isArray(v); }
  
    isBoolean(v: any): boolean { return typeof v === "boolean"; }
  
    isDate(v: any): boolean { return v instanceof Date && !isNaN(v.getTime()); }
    
    isEmail(t: string): number { const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; return emailRegex.test(t) ? 1 : 0; }

    isFuture(time: string | Date): boolean { const timeStamp = new Date(time).getTime(); return timeStamp > Date.now(); }

    isJson(str: string): boolean { try { JSON.parse(str); return true; } catch (e) { return false; } }

    isLeapYear(d: string = 'now'): boolean { const date = new Date(d); const year = date.getFullYear(); return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)); }

    isNull(v: any): boolean { let r = false; if(v === null) { r = true; } return r; }

    isNumeric(v: any): boolean { return !isNaN(Number(v)); }
    
    isObject(v: any): boolean { return typeof v === "object" && v !== null; }
    
    isPast(time: string | Date): boolean { const timeStamp = new Date(time).getTime(); return timeStamp < Date.now(); }

    isSet(o: object, k: string): boolean { return o.hasOwnProperty(k); }

    isSimple(value: unknown): boolean { return value !== null && value !== undefined && typeof value !== "object" && typeof value !== "function"; }

    isStellarPublic(v: string): number { return v.length === 56 && v.startsWith('G') ? 1 : 0; }

    isStellarSecret(v: string): number { return v.length === 56 && v.startsWith('S') ? 1 : 0; }

    isToday(time: string | Date): boolean { const inputDate = new Date(time); const today = new Date(); return inputDate.toDateString() === today.toDateString(); }

    isUUID(value: string): boolean { const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i; return regex.test(value); }

    isUsPhone(p: string): number { const regex = /^\(?(\d{3})\)?[-\. ]?(\d{3})[-\. ]?(\d{4})$/; return regex.test(p) ? 1 : 0; }

    keysArray(): string[] { return Object.keys(this); }
    

    left(s: string, n: number): string { return s.slice(0, n); }
    
    lcase(t: string): string { return t.toLowerCase(); }

    len(str: string): number { return str.length; }

    listContains(fld: string, str: string, delims: string = ','): number { const parts = new Set(fld.split(delims).map(part => part.toLowerCase())); return parts.has(str.toLowerCase()) ? 1 : 0; }

    listFind(list: string, value: string, delims: string = ','): number { const newList = list.split(delims); const pos = newList.indexOf(value); return pos === -1 ? -1 : pos; }

    listFindNoCase(list: string, value: string, delims: string = ','): number { const lList = list.toLowerCase(); const lValue = value.toLowerCase(); const newList = lList.split(delims); const pos = newList.findIndex(token => token === lValue); return pos === -1 ? -1 : pos; }

    listFirst(list: string, delims: string = ','): string { const newList = list.split(delims); return newList.length >= 1 ? newList[0] : list; }

    listGetAt(list: string, pos: number, delims: string = ','): string { const aList = list.split(delims); const adjustedPos = pos > 0 ? pos - 1 : 0; return adjustedPos < aList.length ? aList[adjustedPos] : ''; }

    listLast(list: string, delims: string = ','): string { const newList = list.split(delims); return newList.length > 0 ? newList[newList.length - 1] : list; }

    listProperties(): string[] { return Object.keys(this); }

    listPropertyObjects(): Record<string, any> {
        let o: Record<string, any> = {};
        const ks = this.keysArray();
        for(let i=0; i<ks.length; i++) {
            let k = ks[i];
            let v = this[k];
            if(this.isObject(v)) { o[k] = v; }
        }
        return o;
    }

    menuCurrencies(): { [key: string]: string } { return { USD: 'US Dollar' }; }

    menuHours(): { [key: string]: string } { let b: { [key: string]: string } = {}; let t = ''; let h = 0; for (let i = 0; i < 24; i++) { if (i > 12) { t = 'PM'; h = i - 12; } else { h = i; t = 'AM'; } let v = h.toString() + ':' + t; let k = this.zeroPad(i.toString(), 2) + ':00:00'; b[k] = v; } return b; }
    
    menuImages(): { [key: string]: string } { return { bmp: 'image/bmp',eps: 'image/eps',gif: 'image/gif',jpg: 'image/jpg',png: 'image/png',psd: 'image/psd',tif: 'image/tif' }; }

    menuLevels(): string[] { return ['Guest','Standard','Premium','Consultant','Administrator','Developer']; }

    menuMonths(): { [key: string]: string } { return { '01': 'January (01)', '02': 'February (02)', '03': 'March (03)', '04': 'April (04)', '05': 'May (05)', '06': 'June (06)', '07': 'July (07)', '08': 'August (08)', '09':  'September (09)', '10': 'October (10)', '11': 'November (11)', '12': 'December (12)' }; }

    menuSalutations(): { [key: string]: string } { return { 'Dr.': 'Doctor','Hon.': 'Honorable','Master': 'Master','Mr.': 'Mister','Miss': 'Miss','Ms.': 'Miss','Mrs.': 'Misses','Rev.': 'Reverend' }; }

    menuStates(): { [key: string]: string } { return { AL: "Alabama", AR: "Arkansas", AZ: "Arizona", CA: "California", CO: "Colorado", CT: "Connecticut", DC: "District of Columbia", DE: "Delaware", FL: "Florida", GA: "Georgia", HI: "Hawaii", IA: "Iowa", ID: "Idaho", IL: "Illinois", IN: "Indiana", KS: "Kansas", KY: "Kentucky", LA: "Louisiana", MA: "Massachusetts", MD: "Maryland", ME: "Maine", MI: "Michigan", MN: "Minnesota", MO: "Missouri", MS: "Mississippi", MT: "Montana", NC: "North Carolina", ND: "North Dakota", NE: "Nebraska", NH: "New Hampshire", NJ: "New Jersey", NM: "New Mexico", NV: "Nevada", NY: "New York", OH: "Ohio", OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina", SD: "South Dakota", TN: "Tennessee", TX: "Texas", UT: "Utah", VA: "Virginia", VT: "Vermont", WA: "Washington", WI: "Wisconsin", WV: "West Virginia", WY: "Wyoming" }; }

    menuTimes(): { [key: string]: string } {
      const b: { [key: string]: string } = {};
       for(let i = 0; i < 24; i++) {
        for (let j = 0; j < 60; j += 5) {
          let t = '';
          let h = i;
          if (i >= 12) { t = 'PM'; if (i > 12) h = i - 12; } 
          else { t = 'AM'; }          
          const v = `${h}:${this.zeroPad(j.toString(), 2)}${t}`;
          const k = `${this.zeroPad(i.toString(), 2)}:${this.zeroPad(j.toString(), 2)}:00`;
          b[k] = v;
        }
      }    
      return b;
    }

    menuYears(): { [key: number]: number } {
      const b: { [key: number]: number } = {};
      const y = new Date().getFullYear();
      const z = y + 7;      
      for(let i = y; i < z; i++) { b[i] = i; }
      return b;
    }

    mergeArgs(a: Record<string, any>): void { Object.keys(a).forEach((k) => this.setPropertyValue(k, a[k])); }
    
    mergeObjects(o1: object, o2: object): object { return { ...o1, ...o2 }; }

    mergeProperties(o: Record<string, any>): void { 
      Object.keys(o).forEach((k) => { 
        if (this.hasProperty(k)) { this.setPropertyValue(k, o[k]); } 
      }); 
    }

    microtimeFloat(): number { return Date.now() / 1000;  }

    minute(d: string = "now"): number { return this.parseDate(d).getMinutes(); }

    month(d: string = "now"): number { return this.parseDate(d).getMonth() + 1; }
    
    monthAbbrev(n: number): string {
      let m = 'DEC';
      switch (n) {
        case 1: m = 'JAN'; break;
        case 2: m = 'FEB'; break;
        case 3: m = 'MAR'; break;
        case 4: m = 'APR'; break;
        case 5: m = 'MAY'; break;
        case 6: m = 'JUN'; break;
        case 7: m = 'JUL'; break;
        case 8: m = 'AUG'; break;
        case 9: m = 'SEP'; break;
        case 10: m = 'OCT'; break;
        case 11: m = 'NOV'; break;
      }
      return m;
    }

    monthAsString(d: string = 'now'): string { const date = d === 'now' ? new Date() : new Date(d); const options: Intl.DateTimeFormatOptions = { month: 'long' }; return date.toLocaleString('en-US', options); }

    monthStringFromNumber(n: number): string {
      let m = 'December';
      switch (n) {
        case 1: m = 'January'; break;
        case 2: m = 'February'; break;
        case 3: m = 'March'; break;
        case 4: m = 'April'; break;
        case 5: m = 'May'; break;
        case 6: m = 'June'; break;
        case 7: m = 'July'; break;
        case 8: m = 'August'; break;
        case 9: m = 'September'; break;
        case 10: m = 'October'; break;
        case 11: m = 'November'; break;
      }
      return m;
    }

    now(): number { return Date.now(); }

    numberFormat(number: number, decimals: number = 0, decimalSeparator: string = ".", thousandsSeparator: string = ","): string {
        if(!isFinite(number)) { throw new Error("Invalid number input."); }
        let formattedNumber = number.toFixed(decimals);
        let [integerPart, decimalPart] = formattedNumber.split(".");
        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
        return decimalPart ? integerPart + decimalSeparator + decimalPart : integerPart;
    }

    parseCoinAlpha(coinId: string): string {
        let x = '';
        if(coinId === 'XLM' || coinId === 'native') { x = 'native'; } 
        else { const d = this.parseCoinCode(coinId); if (d.length <= 4) { x = 'credit_alphanum4'; } else { x = 'credit_alphanum12'; } }
        return x;
    }
  
    parseCoinCode(coinId: string): string {
        let x = '';
        if (coinId === 'XLM' || coinId === 'native') { x = 'XLM'; } 
        else { const s = coinId.length; if(s > 56) { const l = s - 56; x = coinId.slice(0, l); } }
        return x;
    }
  
    parseCoinIssuer(coinId: string): string {
        let x = '';
        if(coinId === 'XLM' || coinId === 'native') { x = 'native'; } 
        else { const s = coinId.length; if (s > 56) { x = coinId.slice(-56); } }
        return x;
    }
  
    parseDate(x: string | Date): Date { if(x instanceof Date) { return x; } if (x === "now") { return new Date(); } return new Date(x); }
      
    plural(v: string): string {
        if (v.endsWith('y')) { v = v.slice(0, v.length - 1) + 'ies'; } 
        else if (v.endsWith('s')) { v = v + 'es'; } 
        else { v = v + 's'; }
        return v;
    }
  
    quotedArrayList(a: string[]): string {
        let l = '';
        a.forEach((i, index) => { if(index > 0) { l += ','; } l += `'${i.replace(/'/g, "\\'")}`;  });
        return l;
    }
  
    quotedValueList(l: string, d: string = ','): string {
        let q = '';
        if(l !== '') {
          const a = l.split(d);  
          const i = a.length;    
          a.forEach((v, index) => { q += `"${v}"`; if (index < i - 1) { q += d; } });
        }
        return q;
    }

    replaceKeys(o: Record<string, any>, n: string, r: string): Record<string, any> {
        const a = Object.keys(o);
        let b: {[key: string]: any} = new Object();
        for(let i=0; i<a.length; i++) {
            let k = a[i];
            let v = o[k];
            let f = k.replace(n, r);
            b[f] = v;
        }
        return b;
    }
    
    right(s: string, n: number): string { return s.slice(-n); }

    safeDecrypt(m: string, s: string): string {
        let t = '';
        const algorithm = 'aes-128-cbc';      
        const decoded = Buffer.from(m, 'base64');
        const iv = decoded.subarray(0, 16);
        const hmac = decoded.subarray(16, 48);
        const encryptedData = decoded.subarray(48);      
        const decipher = crypto.createDecipheriv(algorithm, s, iv);    
        let decrypted = decipher.update(encryptedData, undefined, 'utf-8');
        decrypted += decipher.final('utf-8');
        const computedHmac = crypto.createHmac('sha256', s).update(encryptedData).digest();
        if (crypto.timingSafeEqual(hmac, computedHmac)) { t = decrypted; }
        return t;
    }
  
    safeEncrypt(plainText: string, secret: string): string {
        const algorithm = 'aes-128-cbc';
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(algorithm, secret, iv);
        let encrypted = cipher.update(plainText, 'utf8', 'base64');
        encrypted += cipher.final('base64');
        const hmac = crypto.createHmac('sha256', secret).update(Buffer.from(encrypted, 'base64')).digest();
        const result = Buffer.concat([iv, hmac, Buffer.from(encrypted, 'base64')]);
        return result.toString('base64');
    }

    second(d: string = "now"): number { return this.parseDate(d).getSeconds(); }

    setDefaultProperty(k: string, v: unknown): void { if (!this.hasProperty(k) || this[k] === null) { this[k] = v; } }

    setObjectPropertyValue(o: {[key: string]: any}, k: string, v: any): {[key: string]: any} { if(o.hasProperty(k)) { o[k] = v; } return o; }

    setPropertyValue(k: string, v: any): void { this[k] = v; }

    singular(v: string): string {
        if (v.slice(-3) === 'ies') { v = v.slice(0, v.length - 3) + 'y'; } 
        else if (v.slice(-4) === 'sses') { v = v.slice(0, v.length - 2); } 
        else if (v.slice(-1) === 's') { v = v.slice(0, v.length - 1); }
        return v;
    }

    strReplace(search: string | string[], replace: string | string[], subject: string): string {
        if(Array.isArray(search)) {
          if(!Array.isArray(replace)) { replace = Array(search.length).fill(replace); }
          search.forEach((s, index) => {
            const replacement = replace[index] ?? "";
            subject = subject.split(s).join(replacement);
          });	
          return subject;
        }
        return subject.split(search).join(replace as string);
    }

    thirtyDaysAgo(): string {
        const now = new Date();
        now.setDate(now.getDate() - 30);
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');    
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
  
    thirtyDaysFromNow(): string {
        const now = new Date();
        now.setDate(now.getDate() + 30);
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    
    time(): number { return Math.floor(Date.now() / 1000); }
    
    titleCase(t: string): string { return t.toLowerCase().split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" "); }
  
    trim(str: string, chars: string = " \t\n\r\v\0"): string { const pattern = new RegExp(`^[${chars}]+|[${chars}]+$`, "g"); return str.replace(pattern, ""); }

    ucase(t: string): string { return t.toUpperCase(); }

    unset(key: string): void { if(key in this.data) { delete this.data[key]; } }

    week(date: string = 'now'): string {
        const inputDate = date === 'now' ? new Date() : new Date(date);
        const oneJan = new Date(inputDate.getFullYear(), 0, 1);
        const dayOfYear = ((inputDate.getTime() - oneJan.getTime()) / 86400000) + 1;
        return String(Math.ceil(dayOfYear / 7));
    }

    year(d: string = "now"): number { return this.parseDate(d).getFullYear(); }

    yesNoFormat(b: boolean | number): string { return (b === true || b === 1) ? 'Yes' : 'No'; }

    yesterday(): string {
        const now = new Date();
        now.setDate(now.getDate() - 1);
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    zeroPad(t: string, l: number): string { return t.padStart(l, "0"); }

    zeroUnpad(t: string): string {
        let length = t.length;
        for (let i = 1; i < length; i++) {
            const p = length - i;
            const s = t.charAt(p);	  
            if (s === '0') { t = t.substring(0, p); } 
            else if (s === '.') { t = t.substring(0, p); break; } 
            else { break; }
        }
        return t;
    }
}