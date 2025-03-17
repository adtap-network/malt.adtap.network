// src/classes/malt.ts
import crypto from "crypto";
import { parsePhoneNumberFromString } from "libphonenumber-js";
var Malt = class _Malt {
  constructor(a = {}) {
    this.mergeArgs(a);
  }
  addslashes(str) {
    return str.replace(/(['"\\])/g, "\\$1").replace(/\0/g, "\\0");
  }
  amPm(v) {
    const o = this.parseDate(v);
    const h = o.getHours();
    return h >= 12 ? "pm" : "am";
  }
  arrayContains(t, v) {
    return t.includes(v);
  }
  arrayIndex(a, v) {
    return a.indexOf(v);
  }
  arrayLen(t) {
    return t.length;
  }
  arraySort(a, t = "numeric", o = "asc") {
    const na = [...a];
    if (o === "desc") {
      if (t === "numeric") {
        na.sort((x, y) => y - x);
      } else {
        na.sort((x, y) => y.localeCompare(x));
      }
    } else {
      if (t === "numeric") {
        na.sort((x, y) => x - y);
      } else {
        na.sort((x, y) => x.localeCompare(y));
      }
    }
    return na;
  }
  asciiPeriod() {
    return String.fromCharCode(46);
  }
  asciiPound() {
    return String.fromCharCode(35);
  }
  asciiAmper() {
    return String.fromCharCode(38);
  }
  asciiTab() {
    return String.fromCharCode(9);
  }
  asciiCr() {
    return String.fromCharCode(13);
  }
  asciiLf() {
    return String.fromCharCode(10);
  }
  asciiCrlf() {
    return String.fromCharCode(13) + String.fromCharCode(10);
  }
  asciiDquote() {
    return String.fromCharCode(34);
  }
  asciiComma() {
    return String.fromCharCode(44);
  }
  asciiSquote() {
    return String.fromCharCode(39);
  }
  asciiSpace() {
    return String.fromCharCode(32);
  }
  asciiDash() {
    return String.fromCharCode(45);
  }
  asciiSemi() {
    return String.fromCharCode(59);
  }
  asciiQmark() {
    return String.fromCharCode(63);
  }
  asciiBslash() {
    return String.fromCharCode(92);
  }
  asciiFslash() {
    return String.fromCharCode(47);
  }
  asciiUnderscore() {
    return String.fromCharCode(95);
  }
  byteConvert(n, u = "") {
    if (!this.isNumeric(n) || n < 0) {
      return "Invalid size argument";
    }
    const k = 1024;
    const m = 1048576;
    const g = 1073741824;
    let r = 0;
    if (u === "") {
      if (n < k) {
        u = "bytes";
        r = n;
      } else if (n < m) {
        u = "KB";
        r = n / k;
      } else if (n < g) {
        u = "MB";
        r = n / m;
      } else {
        u = "GB";
        r = n / g;
      }
    }
    return `${r.toFixed(2)} ${u}`;
  }
  calculateSpread(b, a) {
    let bid = isNaN(Number(b)) ? 0 : Number(b);
    let ask = isNaN(Number(a)) ? 0 : Number(a);
    let spread = 0;
    if (bid > 0 && ask > 0) {
      spread = this.formatTrecimal((ask - bid) / ask);
    }
    return spread;
  }
  camelize(s) {
    let t = "";
    const a = s.split("_");
    for (const k of a) {
      let v = this.capitalizeFirst(k);
      t += v;
    }
    return t;
  }
  capitalizeFirst(s) {
    if (!s) return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  chr(ascii) {
    return String.fromCharCode(ascii);
  }
  cleanBreaks(t) {
    return t.replace(/(\r\n|\r|\n)/g, "").trim();
  }
  cleanData(s) {
    s = s.replace(/\t/g, "\\t");
    s = s.replace(/\r?\n/g, "\\n");
    if (s.includes('"')) {
      s = '"' + s.replace(/"/g, '""') + '"';
    }
    return s;
  }
  cleanEntryHtml(h) {
    return h.replace(/<!DOCTYPE html>|<\/?html>|<\/?head>|<\/?body>/g, "").trim();
  }
  cleanFilename(f) {
    f = f.trim();
    f = this.convertAscii(f);
    const replacements = [[" ", "_"], ["#", ""], ["&", ""], ["'", ""], ['"', ""], ["?", ""], [",", ""], ["	", "_"], [";", ""], ["$", ""], ["*", ""], ["\xFA", ""]];
    for (const [search, replace] of replacements) {
      f = f.replace(new RegExp(search, "g"), replace);
    }
    return f.trim();
  }
  cleanUrl(u) {
    u = u.replace("http://", "").replace("https://", "");
    return u.trim();
  }
  contains(needle, haystack) {
    return haystack.toLowerCase().includes(needle.toLowerCase());
  }
  convertAscii(t) {
    const search = ["\u2018", "\u2019", "\u201C", "\u201D", "\u2013", "\u2014", "\u20AC", "\xB7", "\u2026"];
    const replace = ["'", "'", '"', '"', "--", "---", "*", "*", "..."];
    for (let i = 0; i < search.length; i++) {
      t = t.replace(new RegExp(search[i], "g"), replace[i]);
    }
    t = t.replace(/[^\x01-\x7F]/g, "");
    return t.trim();
  }
  countKeys() {
    return Object.keys(this).length;
  }
  countStringTokens(s, delimiter = ",") {
    const tokens = s.split(delimiter);
    return tokens.length;
  }
  createDatePath(ps = "\\") {
    return this.year().toString() + ps + this.zeroPad(this.month().toString(), 2) + ps + this.zeroPad(this.day().toString(), 2);
  }
  createMalt(a = {}) {
    return new _Malt(a);
  }
  createShort(t) {
    let s = this.left(t.trim().toLowerCase().replace(/ /g, "-"), 36);
    if (this.right(s, 1) === "-") {
      s = this.left(s, s.length - 1);
    }
    return this.cleanFilename(s);
  }
  createUuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      return (c === "x" ? r : r & 3 | 8).toString(16);
    });
  }
  dateAdd(unit = "day", amount = 1, date = /* @__PURE__ */ new Date()) {
    const timeUnits = { second: 1, minute: 60, hour: 3600, day: 86400, week: 604800, month: 2620800, quarter: 7862400, year: 31449600 };
    const dt = new Date(date).getTime() / 1e3;
    const timeUnit = timeUnits[unit] || 86400;
    const increment = isNaN(amount) ? 1 : amount;
    const newTime = Math.ceil(dt + timeUnit * increment);
    const resultDate = new Date(newTime * 1e3);
    return `${resultDate.getFullYear()}-${String(resultDate.getMonth() + 1).padStart(2, "0")}-${String(resultDate.getDate()).padStart(2, "0")} ${String(resultDate.getHours()).padStart(2, "0")}:${String(resultDate.getMinutes()).padStart(2, "0")}:${String(resultDate.getSeconds()).padStart(2, "0")}`;
  }
  dateCompare(date1, date2) {
    const d1 = Date.now() - new Date(date1).getTime();
    const d2 = Date.now() - new Date(date2).getTime();
    if (d1 < d2) {
      return -1;
    } else if (d1 > d2) {
      return 1;
    } else {
      return 0;
    }
  }
  dateSubtract(u = "day", a = 1, d = "now") {
    const units = { second: 1, minute: 60, hour: 3600, day: 86400, week: 604800, month: 2620800, quarter: 7862400, year: 31449600 };
    let dt = new Date(d).getTime() / 1e3;
    let unitInSeconds = units[u] ?? 86400;
    if (isNaN(a)) a = 1;
    const t = Math.ceil(dt - unitInSeconds * a);
    const resultDate = new Date(t * 1e3);
    const year = resultDate.getFullYear();
    const month = String(resultDate.getMonth() + 1).padStart(2, "0");
    const day = String(resultDate.getDate()).padStart(2, "0");
    const hours = String(resultDate.getHours()).padStart(2, "0");
    const minutes = String(resultDate.getMinutes()).padStart(2, "0");
    const seconds = String(resultDate.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  day(d = "now") {
    return this.parseDate(d).getDate();
  }
  dayAsString(d = "now") {
    const dayNumber = this.dayOfWeek(d);
    let dayString;
    switch (dayNumber) {
      case 1:
        dayString = "Sunday";
        break;
      case 2:
        dayString = "Monday";
        break;
      case 3:
        dayString = "Tuesday";
        break;
      case 4:
        dayString = "Wednesday";
        break;
      case 5:
        dayString = "Thursday";
        break;
      case 6:
        dayString = "Friday";
        break;
      case 7:
        dayString = "Saturday";
        break;
      default:
        dayString = "";
        break;
    }
    return dayString;
  }
  dayOfWeek(d = "now") {
    const date = new Date(d);
    const day = date.getDay();
    return day === 0 ? 7 : day;
  }
  dayOfYear(d = "now") {
    const date = new Date(d);
    const startOfYear = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - startOfYear.getTime();
    const oneDay = 1e3 * 60 * 60 * 24;
    return Math.floor(diff / oneDay) + 1;
  }
  daysInMonth(d = "now") {
    const month = this.month(d);
    const year = this.year(d);
    const lastDayOfMonth = new Date(year, month, 0);
    return lastDayOfMonth.getDate();
  }
  decryptKey(t, k) {
    const algorithm = "aes-256-ctr";
    const key = Buffer.from(k, "utf8");
    const encryptedText = Buffer.from(t, "base64");
    const ivLength = 16;
    const iv = encryptedText.subarray(0, ivLength);
    const encrypted = encryptedText.subarray(ivLength);
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encrypted);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString("utf8");
  }
  deepReplace(search, str) {
    search.forEach((s) => {
      const regex = new RegExp(s, "g");
      str = str.replace(regex, "");
    });
    return str;
  }
  encryptKey(plaintext, keyStr) {
    const algorithm = "aes-256-ctr";
    const key = Buffer.from(keyStr, "utf8");
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(plaintext, "utf8");
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    const encryptedText = Buffer.concat([iv, encrypted]).toString("base64");
    return encryptedText;
  }
  escDbString(t) {
    let j = JSON.stringify(t.trim());
    if (/(\\u[ed][0-9a-f]{3})/i.test(j)) {
      j = j.replace(/(\\u[ed][0-9a-f]{3})/gi, "\\$1");
      t = JSON.parse(j);
    }
    return t.replace(/['"\\]/g, "\\$&");
  }
  escBr(field) {
    field = field.replace(/<br\/><br\/><br\/><br\/>/g, "<br/><br/>");
    field = field.replace(/<\/li><br\/><br\/>/g, "</li>");
    field = field.replace(/<ol><br\/><br\/>/g, "<ol>");
    field = field.replace(/<ul><br\/><br\/>/g, "<ul>");
    field = field.replace(/<\/ol><br\/><br\/>/g, "</ol>");
    field = field.replace(/<\/ul><br\/><br\/>/g, "</ul>");
    field = field.replace(/<\/p><br\/><br\/>/g, "</p>");
    return field;
  }
  escEmail(field) {
    return field.replace("@", " [at] ").replace(".", " [dot] ");
  }
  escHtml(field) {
    return field ? field.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : "";
  }
  escLike(field) {
    return field.replace(/[%_]/g, (match) => `\\${match}`);
  }
  escLog(f) {
    f = f.trim();
    f = f.replace("\n", "");
    f = f.replace("\r", "");
    f = f.replace("  ", " ");
    f = f.replace("	", " ");
    f = f.trim();
    return f.replace(/'/g, "\\'");
  }
  escSql(b) {
    return b.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\0/g, "\\0");
  }
  escTextarea(field) {
    return field.replace(/'/g, "&apos;");
  }
  escUrl(field) {
    if (field === "") return field;
    let originalUrl = field;
    field = field.replace(/[^a-z0-9-~+_.?#=!&;,/:%@$\|*'()\\x80-\\xff]/gi, "");
    const strip = ["%0d", "%0a", "%0D", "%0A"];
    field = this.deepReplace(strip, field);
    field = field.replace(";//", "://");
    if (field.indexOf(":") === -1 && !["/", "#", "?"].includes(field[0]) && !/^[a-z0-9-]+?\.php/i.test(field)) {
      field = "http://" + field;
    }
    return field;
  }
  find(needle, haystack, startpos = 0) {
    const pos = haystack.toLowerCase().indexOf(needle.toLowerCase(), startpos);
    return pos === -1 ? 0 : pos + 1;
  }
  floatToFraction(n, tolerance = 1e-9) {
    let h1 = 1;
    let h2 = 0;
    let k1 = 0;
    let k2 = 1;
    let b = 1 / n;
    do {
      b = 1 / b;
      const a = Math.floor(b);
      const aux = h1;
      h1 = a * h1 + h2;
      h2 = aux;
      const auxK = k1;
      k1 = a * k1 + k2;
      k2 = auxK;
      b = b - a;
    } while (Math.abs(n - h1 / k1) > n * tolerance);
    if (h1 !== 0 && k1 !== 0) {
      return { numerator: h1, denominator: k1, str_view: `${h1}/${k1}` };
    } else {
      return false;
    }
  }
  formatCurrency(v) {
    let n = v;
    const numValue = Number(v);
    if (numValue !== Number.POSITIVE_INFINITY && !isNaN(numValue)) {
      n = `$${numValue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    }
    return n;
  }
  formatDate(v) {
    const date = new Date(v);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }
  formatDecimal(v, precision = 2) {
    return parseFloat(v.toFixed(precision));
  }
  formatInteger(v) {
    let n = "0";
    if (!isNaN(v)) {
      n = Number(v).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    }
    return n;
  }
  formatIssuer(v) {
    let i = "";
    if (v !== null) {
      i = v;
      if (this.isStellarPublic(v)) {
        i = this.left(v, 4) + "..." + this.right(v, 4);
      }
    }
    return i;
  }
  formatLcase(v) {
    return v.toLowerCase();
  }
  formatLumens(v) {
    let n = v;
    if (v !== "\u221E") {
      n = Number(v).toFixed(7);
    }
    return n;
  }
  formatMaxChars(v, n = 30) {
    return v.length <= n ? v : `${v.slice(0, n - 3)}...`;
  }
  formatPhone(phone) {
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length === 10) {
      return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    }
    if (cleaned.length > 10) {
      return "+" + cleaned;
    }
    return phone;
  }
  formatPlusPhone(phone, defaultCountry = "US") {
    const phoneNumber = parsePhoneNumberFromString(phone, defaultCountry);
    if (phoneNumber) {
      return phoneNumber.formatInternational();
    }
    return phone;
  }
  formatStroops(v) {
    return v.toFixed(8);
  }
  formatTime(v) {
    return this.getTimeShort(v);
  }
  formatTcase(v) {
    return this.titleCase(v);
  }
  formatTrecimal(value) {
    return parseFloat(value.toFixed(3));
  }
  formatUcase(v) {
    return v.toUpperCase();
  }
  formatYesNo(b) {
    return this.yesNoFormat(b);
  }
  generateCode(prefix = "CMMN") {
    if (prefix.length !== 4) {
      throw new Error("Prefix must be exactly 4 characters long.");
    }
    const rand5 = Math.floor(Math.random() * (99999 - 1e4 + 1)) + 1e4;
    const rand4 = Math.floor(Math.random() * (9999 - 1e3 + 1)) + 1e3;
    const rand3 = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
    const year = (/* @__PURE__ */ new Date()).getFullYear();
    const month = this.zeroPad(Number((/* @__PURE__ */ new Date()).getMonth() + 1).toString(), 2);
    const day = this.zeroPad(Number((/* @__PURE__ */ new Date()).getDate()).toString(), 2);
    const hour = this.zeroPad(Number((/* @__PURE__ */ new Date()).getHours()).toString(), 2);
    return `${prefix}${rand5}Y${year}M${month}${rand4}D${day}${rand3}H${hour}`;
  }
  generateDesKey() {
    let t = "";
    const v = "aeuyAEUY";
    const c = "bdghjmnpqrstvzBDGHJLMNPQRSTVWXZ";
    let a = Math.floor(Date.now() / 1e3) % 2;
    for (let i = 0; i < 8; i++) {
      if (a === 1) {
        t += c[Math.floor(Math.random() * c.length)];
        a = 0;
      } else {
        t += v[Math.floor(Math.random() * v.length)];
        a = 1;
      }
    }
    return t.substring(0, 2);
  }
  generateOrderNumber() {
    const i = Math.floor(Math.random() * (99999 - 1e4 + 1)) + 1e4;
    const n = this.generateRandomString(3);
    const year = (/* @__PURE__ */ new Date()).getFullYear();
    const month = String((/* @__PURE__ */ new Date()).getMonth() + 1).padStart(2, "0");
    const day = String((/* @__PURE__ */ new Date()).getDate()).padStart(2, "0");
    const hour = String((/* @__PURE__ */ new Date()).getHours()).padStart(2, "0");
    const minute = String((/* @__PURE__ */ new Date()).getMinutes()).padStart(2, "0");
    return `${n.toUpperCase()}${year}${month}${day}${hour}${minute}${i}D`;
  }
  generatePassword(l = 8) {
    const a = "aeuyAEUYbdghjmnpqrstvzBDGHJLMNPQRSTVWXZ23456789";
    const n = a.length;
    let t = "";
    for (let i = 0; i < l; i++) {
      let k = a[Math.floor(Math.random() * n)];
      if (i === 1 && /\d/.test(k)) {
        i--;
      } else {
        t += k;
      }
    }
    return t;
  }
  generateRandomString(l = 10) {
    const s = "abcdefghijklmnopqrstuvwxyz";
    const c = s.length;
    let r = "";
    for (let i = 0; i < l; i++) {
      r += s[Math.floor(Math.random() * c)];
    }
    return r;
  }
  getBase64Extension(t) {
    let x = "";
    const l = t.substring(0, 12);
    if (l === "data:image/p") {
      x = "png";
    } else if (l === "data:image/g") {
      x = "gif";
    } else if (l === "data:image/j") {
      x = "jpg";
    }
    return x;
  }
  getCgiValue(key) {
    return process.env[key];
  }
  getClientAgent() {
    return process.env["HTTP_USER_AGENT"];
  }
  getColorspaceLabel(n) {
    const colorSpaceMap = { 1: "MASKED", 2: "1BIT", 4: "GREY", 8: "PALETTE", 16: "RGB", 17: "RGB with mask", 32: "CMYK", 33: "CMYK with mask", 64: "LAB", 128: "RGBHIGH" };
    return colorSpaceMap[n] || "";
  }
  getDateBlog(d) {
    const date = new Date(d);
    const datePart = date.toISOString().split("T")[0];
    const timePart = date.toTimeString().split(" ")[0];
    return `${datePart}T${timePart}Z`;
  }
  getDateCalendar(d) {
    const date = new Date(d);
    return date.toISOString().split("T")[0];
  }
  getDateDashed(d) {
    const date = new Date(d);
    return date.toISOString().split("T")[0];
  }
  getDateDigitsNow() {
    const year = this.year();
    const month = this.zeroPad(this.month().toString(), 2);
    const day = this.zeroPad(this.day().toString(), 2);
    return `${year}${month}${day}`;
  }
  getDateEdition(d) {
    const date = new Date(d);
    const day = date.toLocaleString("default", { weekday: "short" });
    const dayOfMonth = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${day}, ${dayOfMonth} ${month} ${year}`;
  }
  getDateKeyNow() {
    const now = /* @__PURE__ */ new Date();
    const date = now.toISOString().split("T")[0];
    return `date-${date}`;
  }
  getDateLog(d) {
    const date = new Date(d);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    const time = date.toTimeString().split(" ")[0];
    return `${month}/${day}/${year} ${time}`;
  }
  getDateLong(d) {
    const date = new Date(d);
    const datePart = date.toISOString().split("T")[0];
    const timePart = date.toTimeString().split(" ")[0];
    return `${datePart} ${timePart}`;
  }
  getDateMilitary(d) {
    const date = new Date(d);
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }
  getDateNow() {
    const now = /* @__PURE__ */ new Date();
    const date = now.toISOString().split("T")[0];
    const time = now.toTimeString().split(" ")[0];
    return `${date} ${time}`;
  }
  getDateRfc(d) {
    const date = new Date(d);
    return date.toUTCString().replace("GMT", "+0000");
  }
  getDateShort(d) {
    const date = new Date(d);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }
  getFixedSizeFromPercent(pct, total, pad = 0) {
    const x = Math.floor(pct * total / 100 - pad);
    return x;
  }
  getFormattedDateTime(d) {
    const date = new Date(d);
    const formattedDate = date.toLocaleDateString("en-US");
    const formattedTime = date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }).toLowerCase();
    return `${formattedDate} at ${formattedTime}`;
  }
  getGlobalConstant(d) {
    const v = global[d];
    return v !== void 0 ? v : false;
  }
  getMatchingParen(str, startPos) {
    const count = str.length;
    let bracket = 1;
    for (let i = startPos; i < count; i++) {
      if (str[i] === "(") {
        bracket++;
      } else if (str[i] === ")") {
        bracket--;
      }
      if (bracket === 0) {
        return i;
      }
    }
    return void 0;
  }
  getObjectByKey(a, k, v) {
    let p = {};
    const l = a.length;
    for (let i = 0; i < l; i++) {
      let r = a[i];
      if (r.hasOwnProperty(k)) {
        let x = r[k];
        if (x === v) {
          let p2 = r;
          break;
        }
      }
    }
    return p;
  }
  getPrefixObject(p) {
    let a = {};
    const ks = this.keysArray();
    for (let i = 0; i < ks.length; i++) {
      let k = ks[i];
      let v = this[k];
      if (this.left(k, p.length) == p) {
        a[k] = v;
      }
    }
    return a;
  }
  getPropertyValue(k) {
    return this.hasProperty(k) ? this[k] : "";
  }
  getShortDateNow() {
    const date = /* @__PURE__ */ new Date();
    return date.toLocaleDateString("en-US");
  }
  getTimeLong(d) {
    const date = new Date(d);
    return date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
  }
  getTimeShort(d) {
    const date = new Date(d);
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
  }
  hasProperty(k) {
    return Object.prototype.hasOwnProperty.call(this, k);
  }
  hour(d = "now") {
    return this.parseDate(d).getHours();
  }
  isAlphanum(s) {
    return /^[a-zA-Z0-9]+$/.test(s) ? 1 : 0;
  }
  isArray(v) {
    return Array.isArray(v);
  }
  isBoolean(v) {
    return typeof v === "boolean";
  }
  isDate(v) {
    return v instanceof Date && !isNaN(v.getTime());
  }
  isEmail(t) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(t) ? 1 : 0;
  }
  isFuture(time) {
    const timeStamp = new Date(time).getTime();
    return timeStamp > Date.now();
  }
  isJson(str) {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  }
  isLeapYear(d = "now") {
    const date = new Date(d);
    const year = date.getFullYear();
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  }
  isNull(v) {
    let r = false;
    if (v === null) {
      r = true;
    }
    return r;
  }
  isNumeric(v) {
    return !isNaN(Number(v));
  }
  isObject(v) {
    return typeof v === "object" && v !== null;
  }
  isPast(time) {
    const timeStamp = new Date(time).getTime();
    return timeStamp < Date.now();
  }
  isSet(o, k) {
    return o.hasOwnProperty(k);
  }
  isSimple(value) {
    return value !== null && value !== void 0 && typeof value !== "object" && typeof value !== "function";
  }
  isStellarPublic(v) {
    return v.length === 56 && v.startsWith("G") ? 1 : 0;
  }
  isStellarSecret(v) {
    return v.length === 56 && v.startsWith("S") ? 1 : 0;
  }
  isToday(time) {
    const inputDate = new Date(time);
    const today = /* @__PURE__ */ new Date();
    return inputDate.toDateString() === today.toDateString();
  }
  isUUID(value) {
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return regex.test(value);
  }
  isUsPhone(p) {
    const regex = /^\(?(\d{3})\)?[-\. ]?(\d{3})[-\. ]?(\d{4})$/;
    return regex.test(p) ? 1 : 0;
  }
  keysArray() {
    return Object.keys(this);
  }
  left(s, n) {
    return s.slice(0, n);
  }
  lcase(t) {
    return t.toLowerCase();
  }
  len(str) {
    return str.length;
  }
  listContains(fld, str, delims = ",") {
    const parts = new Set(fld.split(delims).map((part) => part.toLowerCase()));
    return parts.has(str.toLowerCase()) ? 1 : 0;
  }
  listFind(list, value, delims = ",") {
    const newList = list.split(delims);
    const pos = newList.indexOf(value);
    return pos === -1 ? -1 : pos;
  }
  listFindNoCase(list, value, delims = ",") {
    const lList = list.toLowerCase();
    const lValue = value.toLowerCase();
    const newList = lList.split(delims);
    const pos = newList.findIndex((token) => token === lValue);
    return pos === -1 ? -1 : pos;
  }
  listFirst(list, delims = ",") {
    const newList = list.split(delims);
    return newList.length >= 1 ? newList[0] : list;
  }
  listGetAt(list, pos, delims = ",") {
    const aList = list.split(delims);
    const adjustedPos = pos > 0 ? pos - 1 : 0;
    return adjustedPos < aList.length ? aList[adjustedPos] : "";
  }
  listLast(list, delims = ",") {
    const newList = list.split(delims);
    return newList.length > 0 ? newList[newList.length - 1] : list;
  }
  listProperties() {
    return Object.keys(this);
  }
  listPropertyObjects() {
    let o = {};
    const ks = this.keysArray();
    for (let i = 0; i < ks.length; i++) {
      let k = ks[i];
      let v = this[k];
      if (this.isObject(v)) {
        o[k] = v;
      }
    }
    return o;
  }
  menuCurrencies() {
    return { USD: "US Dollar" };
  }
  menuHours() {
    let b = {};
    let t = "";
    let h = 0;
    for (let i = 0; i < 24; i++) {
      if (i > 12) {
        t = "PM";
        h = i - 12;
      } else {
        h = i;
        t = "AM";
      }
      let v = h.toString() + ":" + t;
      let k = this.zeroPad(i.toString(), 2) + ":00:00";
      b[k] = v;
    }
    return b;
  }
  menuImages() {
    return { bmp: "image/bmp", eps: "image/eps", gif: "image/gif", jpg: "image/jpg", png: "image/png", psd: "image/psd", tif: "image/tif" };
  }
  menuLevels() {
    return ["Guest", "Standard", "Premium", "Consultant", "Administrator", "Developer"];
  }
  menuMonths() {
    return { "01": "January (01)", "02": "February (02)", "03": "March (03)", "04": "April (04)", "05": "May (05)", "06": "June (06)", "07": "July (07)", "08": "August (08)", "09": "September (09)", "10": "October (10)", "11": "November (11)", "12": "December (12)" };
  }
  menuSalutations() {
    return { "Dr.": "Doctor", "Hon.": "Honorable", "Master": "Master", "Mr.": "Mister", "Miss": "Miss", "Ms.": "Miss", "Mrs.": "Misses", "Rev.": "Reverend" };
  }
  menuStates() {
    return { AL: "Alabama", AR: "Arkansas", AZ: "Arizona", CA: "California", CO: "Colorado", CT: "Connecticut", DC: "District of Columbia", DE: "Delaware", FL: "Florida", GA: "Georgia", HI: "Hawaii", IA: "Iowa", ID: "Idaho", IL: "Illinois", IN: "Indiana", KS: "Kansas", KY: "Kentucky", LA: "Louisiana", MA: "Massachusetts", MD: "Maryland", ME: "Maine", MI: "Michigan", MN: "Minnesota", MO: "Missouri", MS: "Mississippi", MT: "Montana", NC: "North Carolina", ND: "North Dakota", NE: "Nebraska", NH: "New Hampshire", NJ: "New Jersey", NM: "New Mexico", NV: "Nevada", NY: "New York", OH: "Ohio", OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina", SD: "South Dakota", TN: "Tennessee", TX: "Texas", UT: "Utah", VA: "Virginia", VT: "Vermont", WA: "Washington", WI: "Wisconsin", WV: "West Virginia", WY: "Wyoming" };
  }
  menuTimes() {
    const b = {};
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 60; j += 5) {
        let t = "";
        let h = i;
        if (i >= 12) {
          t = "PM";
          if (i > 12) h = i - 12;
        } else {
          t = "AM";
        }
        const v = `${h}:${this.zeroPad(j.toString(), 2)}${t}`;
        const k = `${this.zeroPad(i.toString(), 2)}:${this.zeroPad(j.toString(), 2)}:00`;
        b[k] = v;
      }
    }
    return b;
  }
  menuYears() {
    const b = {};
    const y = (/* @__PURE__ */ new Date()).getFullYear();
    const z = y + 7;
    for (let i = y; i < z; i++) {
      b[i] = i;
    }
    return b;
  }
  mergeArgs(a) {
    Object.keys(a).forEach((k) => this.setPropertyValue(k, a[k]));
  }
  mergeObjects(o1, o2) {
    return { ...o1, ...o2 };
  }
  mergeProperties(o) {
    Object.keys(o).forEach((k) => {
      if (this.hasProperty(k)) {
        this.setPropertyValue(k, o[k]);
      }
    });
  }
  microtimeFloat() {
    return Date.now() / 1e3;
  }
  minute(d = "now") {
    return this.parseDate(d).getMinutes();
  }
  month(d = "now") {
    return this.parseDate(d).getMonth() + 1;
  }
  monthAbbrev(n) {
    let m = "DEC";
    switch (n) {
      case 1:
        m = "JAN";
        break;
      case 2:
        m = "FEB";
        break;
      case 3:
        m = "MAR";
        break;
      case 4:
        m = "APR";
        break;
      case 5:
        m = "MAY";
        break;
      case 6:
        m = "JUN";
        break;
      case 7:
        m = "JUL";
        break;
      case 8:
        m = "AUG";
        break;
      case 9:
        m = "SEP";
        break;
      case 10:
        m = "OCT";
        break;
      case 11:
        m = "NOV";
        break;
    }
    return m;
  }
  monthAsString(d = "now") {
    const date = d === "now" ? /* @__PURE__ */ new Date() : new Date(d);
    const options = { month: "long" };
    return date.toLocaleString("en-US", options);
  }
  monthStringFromNumber(n) {
    let m = "December";
    switch (n) {
      case 1:
        m = "January";
        break;
      case 2:
        m = "February";
        break;
      case 3:
        m = "March";
        break;
      case 4:
        m = "April";
        break;
      case 5:
        m = "May";
        break;
      case 6:
        m = "June";
        break;
      case 7:
        m = "July";
        break;
      case 8:
        m = "August";
        break;
      case 9:
        m = "September";
        break;
      case 10:
        m = "October";
        break;
      case 11:
        m = "November";
        break;
    }
    return m;
  }
  now() {
    return Date.now();
  }
  numberFormat(number, decimals = 0, decimalSeparator = ".", thousandsSeparator = ",") {
    if (!isFinite(number)) {
      throw new Error("Invalid number input.");
    }
    let formattedNumber = number.toFixed(decimals);
    let [integerPart, decimalPart] = formattedNumber.split(".");
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
    return decimalPart ? integerPart + decimalSeparator + decimalPart : integerPart;
  }
  parseCoinAlpha(coinId) {
    let x = "";
    if (coinId === "XLM" || coinId === "native") {
      x = "native";
    } else {
      const d = this.parseCoinCode(coinId);
      if (d.length <= 4) {
        x = "credit_alphanum4";
      } else {
        x = "credit_alphanum12";
      }
    }
    return x;
  }
  parseCoinCode(coinId) {
    let x = "";
    if (coinId === "XLM" || coinId === "native") {
      x = "XLM";
    } else {
      const s = coinId.length;
      if (s > 56) {
        const l = s - 56;
        x = coinId.slice(0, l);
      }
    }
    return x;
  }
  parseCoinIssuer(coinId) {
    let x = "";
    if (coinId === "XLM" || coinId === "native") {
      x = "native";
    } else {
      const s = coinId.length;
      if (s > 56) {
        x = coinId.slice(-56);
      }
    }
    return x;
  }
  parseDate(x) {
    if (x instanceof Date) {
      return x;
    }
    if (x === "now") {
      return /* @__PURE__ */ new Date();
    }
    return new Date(x);
  }
  plural(v) {
    if (v.endsWith("y")) {
      v = v.slice(0, v.length - 1) + "ies";
    } else if (v.endsWith("s")) {
      v = v + "es";
    } else {
      v = v + "s";
    }
    return v;
  }
  quotedArrayList(a) {
    let l = "";
    a.forEach((i, index) => {
      if (index > 0) {
        l += ",";
      }
      l += `'${i.replace(/'/g, "\\'")}`;
    });
    return l;
  }
  quotedValueList(l, d = ",") {
    let q = "";
    if (l !== "") {
      const a = l.split(d);
      const i = a.length;
      a.forEach((v, index) => {
        q += `"${v}"`;
        if (index < i - 1) {
          q += d;
        }
      });
    }
    return q;
  }
  replaceKeys(o, n, r) {
    const a = Object.keys(o);
    let b = new Object();
    for (let i = 0; i < a.length; i++) {
      let k = a[i];
      let v = o[k];
      let f = k.replace(n, r);
      b[f] = v;
    }
    return b;
  }
  right(s, n) {
    return s.slice(-n);
  }
  safeDecrypt(m, s) {
    let t = "";
    const algorithm = "aes-128-cbc";
    const decoded = Buffer.from(m, "base64");
    const iv = decoded.subarray(0, 16);
    const hmac = decoded.subarray(16, 48);
    const encryptedData = decoded.subarray(48);
    const decipher = crypto.createDecipheriv(algorithm, s, iv);
    let decrypted = decipher.update(encryptedData, void 0, "utf-8");
    decrypted += decipher.final("utf-8");
    const computedHmac = crypto.createHmac("sha256", s).update(encryptedData).digest();
    if (crypto.timingSafeEqual(hmac, computedHmac)) {
      t = decrypted;
    }
    return t;
  }
  safeEncrypt(plainText, secret) {
    const algorithm = "aes-128-cbc";
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, secret, iv);
    let encrypted = cipher.update(plainText, "utf8", "base64");
    encrypted += cipher.final("base64");
    const hmac = crypto.createHmac("sha256", secret).update(Buffer.from(encrypted, "base64")).digest();
    const result = Buffer.concat([iv, hmac, Buffer.from(encrypted, "base64")]);
    return result.toString("base64");
  }
  second(d = "now") {
    return this.parseDate(d).getSeconds();
  }
  setDefaultProperty(k, v) {
    if (!this.hasProperty(k) || this[k] === null) {
      this[k] = v;
    }
  }
  setObjectPropertyValue(o, k, v) {
    if (o.hasProperty(k)) {
      o[k] = v;
    }
    return o;
  }
  setPropertyValue(k, v) {
    this[k] = v;
  }
  singular(v) {
    if (v.slice(-3) === "ies") {
      v = v.slice(0, v.length - 3) + "y";
    } else if (v.slice(-4) === "sses") {
      v = v.slice(0, v.length - 2);
    } else if (v.slice(-1) === "s") {
      v = v.slice(0, v.length - 1);
    }
    return v;
  }
  strReplace(search, replace, subject) {
    if (Array.isArray(search)) {
      if (!Array.isArray(replace)) {
        replace = Array(search.length).fill(replace);
      }
      search.forEach((s, index) => {
        const replacement = replace[index] ?? "";
        subject = subject.split(s).join(replacement);
      });
      return subject;
    }
    return subject.split(search).join(replace);
  }
  thirtyDaysAgo() {
    const now = /* @__PURE__ */ new Date();
    now.setDate(now.getDate() - 30);
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  thirtyDaysFromNow() {
    const now = /* @__PURE__ */ new Date();
    now.setDate(now.getDate() + 30);
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  time() {
    return Math.floor(Date.now() / 1e3);
  }
  titleCase(t) {
    return t.toLowerCase().split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  }
  trim(str, chars = " 	\n\r\v\0") {
    const pattern = new RegExp(`^[${chars}]+|[${chars}]+$`, "g");
    return str.replace(pattern, "");
  }
  ucase(t) {
    return t.toUpperCase();
  }
  unset(key) {
    if (key in this.data) {
      delete this.data[key];
    }
  }
  week(date = "now") {
    const inputDate = date === "now" ? /* @__PURE__ */ new Date() : new Date(date);
    const oneJan = new Date(inputDate.getFullYear(), 0, 1);
    const dayOfYear = (inputDate.getTime() - oneJan.getTime()) / 864e5 + 1;
    return String(Math.ceil(dayOfYear / 7));
  }
  year(d = "now") {
    return this.parseDate(d).getFullYear();
  }
  yesNoFormat(b) {
    return b === true || b === 1 ? "Yes" : "No";
  }
  yesterday() {
    const now = /* @__PURE__ */ new Date();
    now.setDate(now.getDate() - 1);
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  zeroPad(t, l) {
    return t.padStart(l, "0");
  }
  zeroUnpad(t) {
    let length = t.length;
    for (let i = 1; i < length; i++) {
      const p = length - i;
      const s = t.charAt(p);
      if (s === "0") {
        t = t.substring(0, p);
      } else if (s === ".") {
        t = t.substring(0, p);
        break;
      } else {
        break;
      }
    }
    return t;
  }
};

// src/classes/malts/account.ts
var AccountMalt = class extends Malt {
  id = "";
  class = "individual";
  status = "new";
  type = "standard";
  login = "";
  code = "";
  full = "";
  email = "";
  phone = "";
  zip = "";
  photo = "";
  hash = "";
  password = "";
  crypt = "";
  secret = "";
  lat = 0;
  lon = 0;
  nonce = 1;
  dob = "";
  createdon = "";
  updatedon = "";
  activities = [];
  balances = [];
  contacts = [];
  fields = [];
  invitations = [];
  issuers = [];
  options = [];
  perms = [];
  rewards = [];
  types = [];
  values = [];
  constructor() {
    super({});
  }
  getAccountActivity(activity_id) {
    return this.getAccountActivityByKey("activity_id", activity_id);
  }
  getAccountActivityByKey(k, v) {
    return this.getObjectByKey(this.activities, k, v);
  }
  getAccountBalance(balance_id) {
    return this.getAccountBalanceByKey("balance_id", balance_id);
  }
  getAccountBalanceByKey(k, v) {
    return this.getObjectByKey(this.balances, k, v);
  }
  getAccountContact(contact_id) {
    return this.getAccountContactByKey("contact_id", contact_id);
  }
  getAccountContactByKey(k, v) {
    return this.getObjectByKey(this.contacts, k, v);
  }
  getAccountField(field_id) {
    return this.getAccountFieldByKey("field_id", field_id);
  }
  getAccountFieldByKey(k, v) {
    return this.getObjectByKey(this.fields, k, v);
  }
  getAccountInvitation(invite_id) {
    return this.getAccountInvitationByKey("invite_id", invite_id);
  }
  getAccountInvitationByKey(k, v) {
    return this.getObjectByKey(this.invitations, k, v);
  }
  getAccountIssuer(issuer_id) {
    return this.getAccountIssuerByKey("issuer_id", issuer_id);
  }
  getAccountIssuerByKey(k, v) {
    return this.getObjectByKey(this.issuers, k, v);
  }
  getAccountOption(option_id) {
    return this.getAccountOptionByKey("option_id", option_id);
  }
  getAccountOptionByKey(k, v) {
    return this.getObjectByKey(this.options, k, v);
  }
  getAccountPerm(perm_id) {
    return this.getAccountPermByKey("perm_id", perm_id);
  }
  getAccountPermByKey(k, v) {
    return this.getObjectByKey(this.perms, k, v);
  }
  getAccountReward(reward_id) {
    return this.getAccountRewardByKey("reward_id", reward_id);
  }
  getAccountRewardByKey(k, v) {
    return this.getObjectByKey(this.rewards, k, v);
  }
  getAccountType(type_id) {
    return this.getAccountTypeByKey("type_id", type_id);
  }
  getAccountTypeByKey(k, v) {
    return this.getObjectByKey(this.types, k, v);
  }
  getAccountValue(value_id) {
    return this.getAccountValueByKey("value_id", value_id);
  }
  getAccountValueByKey(k, v) {
    return this.getObjectByKey(this.values, k, v);
  }
  is2fa() {
    let p = false;
    let f = this.getAccountFieldByKey("field_key", "2fa");
    if (this.isSet(f, "field_id")) {
      let o = this.getAccountValueByKey("value_field", f.field_id);
      if (this.isSet(o, "value_id")) {
        let p2 = Boolean(o["value_free"]);
      }
    }
    return p;
  }
  isPremium() {
    let p = false;
    let f = this.getAccountFieldByKey("field_key", "premium");
    if (this.isSet(f, "field_id")) {
      let o = this.getAccountValueByKey("value_field", f.field_id);
      if (this.isSet(o, "value_id")) {
        let p2 = Boolean(o["value_free"]);
      }
    }
    return p;
  }
  mergeUser(user) {
    if (this.isObject(user)) {
      if (this.isSet(user, "id")) {
        this.id = user["id"];
      }
      if (this.isSet(user, "email")) {
        this.email = user["email"];
      }
      if (this.isSet(user, "name")) {
        this.full = user["name"];
      }
    }
  }
};

// src/classes/malts/agent.ts
var AgentMalt = class extends Malt {
  intervals;
  constructor(intervals) {
    super({});
    this.intervals = intervals;
  }
};

// src/classes/malts/analytic.ts
var AnalyticMalt = class extends Malt {
  analytic_timestamp = "";
  analytic_trades = 0;
  analytic_basevol = 0;
  analytic_countervol = 0;
  analytic_avg = 0;
  analytic_high = 0;
  analytic_low = 0;
  analytic_open = 0;
  analytic_close = 0;
  constructor() {
    super({});
  }
  get_buying_average_price() {
    return this.formatLumens(1 / this.analytic_avg);
  }
  get_buying_high_price() {
    return this.formatLumens(1 / this.analytic_high);
  }
  get_buying_low_price() {
    return this.formatLumens(1 / this.analytic_low);
  }
  get_buying_open_price() {
    return this.formatLumens(1 / this.analytic_open);
  }
  get_buying_close_price() {
    return this.formatLumens(1 / this.analytic_close);
  }
  get_selling_average_price() {
    return this.formatLumens(this.analytic_avg);
  }
  get_selling_high_price() {
    return this.formatLumens(this.analytic_high);
  }
  get_selling_low_price() {
    return this.formatLumens(this.analytic_low);
  }
  get_selling_open_price() {
    return this.formatLumens(this.analytic_open);
  }
  get_selling_close_price() {
    return this.formatLumens(this.analytic_close);
  }
};

// src/classes/malts/analytics.ts
var AnalyticsMalt = class extends Malt {
  periodType = "day";
  periodStart = this.time() * 1e3 - 864e5;
  periodEnd = this.time() * 1e3;
  periodResolution = 36e5;
  periodOffset = 0;
  periodOrder = "asc";
  periodLimit = 12;
  records = [];
  totalRecords = 0;
  constructor() {
    super({});
  }
  addRecord(r) {
    this.records.push(r);
    return this.countRecords();
  }
  countRecords() {
    this.totalRecords = this.records.length;
    return this.totalRecords;
  }
  listRecords() {
    return this.records;
  }
  menuPeriods() {
    return ["hour", "day", "week", "month", "quarter", "year"];
  }
  setPeriod(p) {
    if (p == "hour") {
      this.setPeriodHour();
    } else if (p == "day") {
      this.setPeriodDay();
    } else if (p == "week") {
      this.setPeriodWeek();
    } else if (p == "month") {
      this.setPeriodMonth();
    } else if (p == "quarter") {
      this.setPeriodQuarter();
    } else if (p == "year") {
      this.setPeriodYear();
    }
  }
  setPeriodHour() {
    this.period_type = "hour";
    this.period_start = this.time() * 1e3 - 36e5;
    this.period_end = this.time() * 1e3;
    this.period_resolution = 3e5;
    this.period_limit = 12;
  }
  setPeriodDay() {
    this.period_type = "day";
    this.period_start = this.time() * 1e3 - 864e5;
    this.period_end = this.time() * 1e3;
    this.period_resolution = 36e5;
    this.period_limit = 24;
  }
  setPeriodWeek() {
    this.period_type = "week";
    this.period_start = this.time() * 1e3 - 6048e5;
    this.period_end = this.time() * 1e3;
    this.period_resolution = 864e5;
    this.period_limit = 7;
  }
  setPeriodMonth() {
    this.period_type = "month";
    this.period_start = this.time() * 1e3 - 26208e5;
    this.period_end = this.time() * 1e3;
    this.period_resolution = 1092e5;
  }
  setPeriodQuarter() {
    this.period_type = "quarter";
    this.period_start = this.time() * 1e3 - 78624e5;
    this.period_end = this.time() * 1e3;
    this.period_resolution = 3276e5;
  }
  setPeriodYear() {
    this.period_type = "year";
    this.period_start = this.time() * 1e3 - 314496e5;
    this.period_end = this.time() * 1e3;
    this.period_resolution = 26208e5;
    this.period_limit = 12;
  }
  setRecords(rs) {
    this.records = rs;
    return this.countRecords();
  }
};

// src/classes/malts/bid.ts
var BidMalt = class extends Malt {
  bid_id = "";
  bid_account = "";
  bid_selling = "";
  bid_buying = "";
  bid_amount = 0;
  bid_price = 0;
  bid_updatedon = this.getDateNow();
  coin_id = "";
  coin_name = "";
  coin_code = "";
  coin_issuer = "";
  coin_alpha = "";
  coin_domain = "";
  coin_image = "/images/coins/none.png";
  coin_price = 0;
  counter_id = "";
  counter_name = "";
  counter_code = "";
  counter_issuer = "";
  counter_alpha = "";
  counter_domain = "";
  counter_image = "/images/coins/none.png";
  counter_price = 0;
  constructor() {
    super({});
  }
  setCoin(t) {
    this.mergeProperties(t);
  }
  setCounter(t) {
    let o = this.replaceKeys(t, "coin_", "counter_");
    this.mergeProperties(o);
  }
};

// src/classes/malts/block.ts
var BlockMalt = class extends Malt {
  name;
  title;
  constructor(name, title) {
    super({});
    this.name = name;
    this.title = title;
  }
};

// src/classes/malts/book.ts
var BookMalt = class extends Malt {
  totalAsks = 0;
  totalBids = 0;
  asks = [];
  bids = [];
  base = {};
  counter = {};
  constructor() {
    super({});
  }
  addAsk(a) {
    this.asks.push(a);
    return this.countAsks();
  }
  addBid(a) {
    this.bids.push(a);
    return this.countBids();
  }
  countAsks() {
    this.totalAsks = this.asks.length;
    return this.totalAsks;
  }
  countBids() {
    this.totalBids = this.bids.length;
    return this.totalBids;
  }
  getHighestBuyPrice() {
    let i = 0;
    let a = this.listSellOffers();
    if (a.length > 0) {
      let o = a[0];
      if (o.price > 0) {
        i = this.formatLumens(1 / o.price);
      }
    }
    return i;
  }
  getLowestSellPrice() {
    let i = 0;
    let a = this.listBuyOffers();
    if (a.length > 0) {
      let o = a[0];
      if (o.price > 0) {
        i = this.formatLumens(1 / o.price);
      }
    }
    return i;
  }
  getSpreadAmount() {
    let i = 0;
    let b = this.getHighestBuyPrice();
    let s = this.getLowestSellPrice();
    i = this.formatLumens(s - b);
    return i;
  }
  getSpreadPercent() {
    let i = 0;
    let b = this.getHighestBuyPrice();
    let d = this.getSpreadAmount();
    if (d > 0 && b > 0) {
      i = this.formatDecimal(d / b * 100);
    }
    return i;
  }
  listBuyOffers() {
    let i = 0;
    let a = [];
    for (let n = 0; n < this.bids.length; n++) {
      let o = this.bids[n];
      if (this.isNumeric(o.price) && o.price > 0) {
        let p = 1 / o.price;
        if (p < i) {
          i = p;
          a.unshift(o);
        } else if (p >= 1e-7) {
          a.push(o);
        }
      }
    }
    return a;
  }
  listSellOffers() {
    let i = 0;
    let a = [];
    for (let n = 0; n < this.asks.length; n++) {
      let o = this.asks[n];
      if (this.isNumeric(o.price) && o.price > 0) {
        if (o.price > i) {
          i = o.price;
          a.push(o);
        } else {
          a.unshift(o);
        }
      }
    }
    return a;
  }
  setAsks(a) {
    this.asks = a;
    return this.countAsks();
  }
  setBids(a) {
    this.bids = a;
    return this.countBids();
  }
  compareAsks(a, b) {
    return a.price - b.price;
  }
  compareBids(a, b) {
    return b.price - a.price;
  }
  sortAsks() {
    let a = [];
    for (let i = 0; i < this.asks.length; i++) {
      let b = this.asks[i];
      if (this.isNumeric(b.price) && b.price > 1e-7) {
        a.push(b);
      }
    }
    this.setAsks(a);
    this.asks.sort(this.compareAsks.bind(this));
  }
  sortBids() {
    let a = [];
    for (let i = 0; i < this.bids.length; i++) {
      let b = this.bids[i];
      if (this.isNumeric(b.price) && b.price > 1e-7) {
        a.push(b);
      }
    }
    this.setBids(a);
    this.bids.sort(this.compareBids.bind(this));
  }
};

// src/classes/malts/chart.ts
var ChartMalt = class extends Malt {
  script = "";
  canvas = "";
  context = "2d";
  type = "line";
  period = "day";
  label = this.day() + " " + this.monthAsString() + " " + this.year();
  data = { volume: 0, open: 0, close: 0, labels: "", datasets: [], records: [] };
  constructor() {
    super({});
  }
  menuDay() {
    let b = [];
    let h = 0;
    let t = "";
    for (let i = 0; i < 24; i++) {
      if (i > 12) {
        t = "PM";
        h = i - 12;
      } else {
        h = i;
        t = "AM";
      }
      b.push(h.toString() + " " + t);
    }
    return b;
  }
  menuHour() {
    let b = [];
    for (let j = 0; j < 24; j++) {
      let v = this.zeroPad(j.toString(), 2);
      b.push(v);
    }
    return b;
  }
  menuMonth() {
    return [];
  }
  menuQuarter() {
    return [];
  }
  menuWeek() {
    return ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  }
  menuYear() {
    return ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  }
  setAnalytics(a) {
    this.analytics = a;
  }
  setCanvas(id) {
    this.canvas = id;
  }
  setContext(d) {
    this.context = d;
  }
  setScript(s) {
    this.script = s;
  }
  setType(t) {
    this.type = t;
  }
};

// src/classes/malts/claimable.ts
var ClaimableMalt = class extends Malt {
  claim_id = "";
  claim_account = "";
  claim_coin = "";
  claim_amount = 0;
  claim_xlm = 0;
  claim_usd = 0;
  claim_expires = false;
  claim_expireson = "";
  claim_unlocks = false;
  claim_unlockson = "";
  claim_sponsor = "";
  coin_id = "";
  coin_class = "";
  coin_code = "";
  coin_issuer = "";
  coin_name = "";
  coin_alpha = "";
  coin_domain = "";
  coin_descr = "";
  coin_conditions = "";
  coin_redemption = "";
  coin_image = "";
  coin_supply = "";
  coin_price = 0;
  coin_xlm = 0;
  coin_usd = 0;
  constructor() {
    super({});
  }
};

// src/classes/malts/coin.ts
var Coin = class extends Malt {
  constructor(a = {}) {
    super(a);
    this.setDefaultProperty("CoinId", "");
    this.setDefaultProperty("CoinAccount", "");
    this.setDefaultProperty("CoinClass", "");
    this.setDefaultProperty("CoinType", "");
    this.setDefaultProperty("CoinGroup", "");
    this.setDefaultProperty("CoinReserves", "");
    this.setDefaultProperty("CoinStatus", "");
    this.setDefaultProperty("CoinStripe", "");
    this.setDefaultProperty("CoinQuote", "");
    this.setDefaultProperty("CoinCode", "");
    this.setDefaultProperty("CoinIssuer", "");
    this.setDefaultProperty("CoinAlpha", "");
    this.setDefaultProperty("CoinName", "");
    this.setDefaultProperty("CoinDomain", "");
    this.setDefaultProperty("CoinDescr", "");
    this.setDefaultProperty("CoinConditions", "");
    this.setDefaultProperty("CoinRedemption", "");
    this.setDefaultProperty("CoinAttestation", "");
    this.setDefaultProperty("CoinHtml", "");
    this.setDefaultProperty("CoinImage", "images/coins/NONE.png");
    this.setDefaultProperty("CoinThumb", "images/coins/NONE.png");
    this.setDefaultProperty("CoinSupply", 0);
    this.setDefaultProperty("CoinMin", 0);
    this.setDefaultProperty("CoinMax", 0);
    this.setDefaultProperty("CoinLiquidity", 0);
    this.setDefaultProperty("CoinFee", 0);
    this.setDefaultProperty("CoinPrice", 0);
    this.setDefaultProperty("CoinSpread", 0.05);
    this.setDefaultProperty("CoinYield", 0);
    this.setDefaultProperty("CoinFeatured", 0);
    this.setDefaultProperty("CoinAuth", 0);
    this.setDefaultProperty("CoinFetchedon", 0);
    this.setDefaultProperty("CoinXlm", 0);
    this.setDefaultProperty("CoinUsd", 0);
    this.setDefaultProperty("CoinXau", 0);
    this.setDefaultProperty("CoinXag", 0);
    this.setDefaultProperty("CoinBtc", 0);
    this.setDefaultProperty("CoinSol", 0);
    this.setDefaultProperty("CoinEth", 0);
    this.setDefaultProperty("CoinEur", 0);
    this.setDefaultProperty("CoinAmount", 0);
    this.setDefaultProperty("CoinReserved", 0);
    this.setDefaultProperty("CoinAvailable", 0);
    this.setDefaultProperty("CoinSelling", 0);
    this.setDefaultProperty("CoinBuying", 0);
    this.setDefaultProperty("CoinPooled", 0);
    this.setDefaultProperty("CoinBalance", 0);
    this.setDefaultProperty("TotalHolders", 0);
    this.setDefaultProperty("TotalMarkets", 0);
    this.setDefaultProperty("TotalOperations", 0);
    this.setDefaultProperty("TotalPayments", 0);
    this.setDefaultProperty("TotalPools", 0);
    this.setDefaultProperty("TotalRatings", 0);
    this.setDefaultProperty("TotalTrades", 0);
    this.setDefaultProperty("Holders", []);
    this.setDefaultProperty("Markets", []);
    this.setDefaultProperty("Pools", []);
    this.setDefaultProperty("Ratings", []);
    this.setDefaultProperty("Trades", []);
  }
  countHolders() {
    this.TotalHolders = this.Holders.length;
    return this.TotalHolders;
  }
  countMarkets() {
    this.TotalMarkets = this.Markets.length;
    return this.TotalMarkets;
  }
  countPools() {
    this.TotalPools = this.Pools.length;
    return this.TotalPools;
  }
  countRatings() {
    this.TotalRatings = this.Ratings.length;
    return this.TotalRatings;
  }
  countTrades() {
    this.TotalTrades = this.Trades.length;
    return this.TotalTrades;
  }
};
var coin_default = Coin;

// src/classes/malts/fault.ts
var FaultMalt = class extends Malt {
  file;
  func;
  message;
  date;
  constructor(message, file, func) {
    super({});
    this.message = message;
    this.file = file;
    this.func = func;
    this.date = this.getDateNow();
  }
};

// src/classes/malts/errors.ts
var ErrorsMalt = class extends Malt {
  admin = false;
  codes = {
    c001: { code: "c001", type: "error", message: "unable to connect to remote host." },
    c002: { code: "c002", type: "error", message: "unable to connect to webnative server." },
    c003: { code: "c003", type: "error", message: "unable to connect to the mysql database." },
    c004: { code: "c004", type: "error", message: "unable to connect to the gmg cozone api." },
    c005: { code: "c005", type: "error", message: "unable to verify identity of host (ssl handshake failed)." }
  };
  counter = 0;
  dump = true;
  errors = [];
  settings = { filename: "rocket.log", directory: "D:\\Inetpub\\media\\logs", filepath: "D:\\Inetpub\\media\\logs\\rocket.log" };
  constructor() {
    super({});
  }
  addError(error) {
    this.errors.push(error);
  }
  clearErrors() {
    this.errors = [];
    this.resetCounter();
  }
  createError(code, file, func, msg) {
    return new FaultMalt(msg, file, func);
  }
  createLog() {
    let content = "date,type,file,function,message" + String.fromCharCode(10);
    this.writeFile(this.settings.filepath, content);
  }
  decrementCounter() {
    if (this.counter > 0) {
      this.counter--;
    }
  }
  getCurrentError() {
    return this.getError(this.counter);
  }
  getError(index) {
    let e = {};
    if (index <= this.getErrorCount()) {
      let e2 = this.errors[index];
    }
    return e;
  }
  getErrorCount() {
    return this.errors.length;
  }
  getErrors() {
    return this.errors;
  }
  getSettings() {
    return this.settings;
  }
  incrementCounter() {
    this.counter++;
  }
  logException(e, file, func, type = "error", dump = true) {
    const msg = e.message;
    let c = this.getLog();
    c += this.getDateNow() + "," + type + "," + file + "," + func + "," + msg.replace(/,/g, "") + String.fromCharCode(10);
    this.writeFile(this.settings.filepath, c);
    if (dump == true) {
      this.dumpException(msg, file, func, type);
    }
  }
  nextError() {
    let e = this.getCurrentError();
    this.incrementCounter();
    return e;
  }
  previousError() {
    this.decrementCounter();
    return this.getCurrentError();
  }
  resetCounter() {
    this.counter = 0;
  }
  setSettings(settings) {
    this.settings = settings;
  }
};

// src/classes/malts/extensions.ts
var ExtensionsMalt = class extends Malt {
  _blank = "/images/icons/files/_blank.png";
  aac = "/images/icons/files/aac.png";
  ai = "/images/icons/files/ai.png";
  aiff = "/images/icons/files/aiff.png";
  css = "/images/icons/files/css.png";
  csv = "/images/icons/files/csv.png";
  dat = "/images/icons/files/dat.png";
  doc = "/images/icons/files/doc.png";
  docx = "/images/icons/files/doc.png";
  dotx = "/images/icons/files/dotx.png";
  dwg = "/images/icons/files/dwg.png";
  dxf = "/images/icons/files/dxf.png";
  eps = "/images/icons/files/eps.png";
  epsf = "/images/icons/files/eps.png";
  exe = "/images/icons/files/exe.png";
  gif = "/images/icons/files/gif.png";
  hpp = "/images/icons/files/hpp.png";
  html = "/images/icons/files/html.png";
  htm = "/images/icons/files/html.png";
  ics = "/images/icons/files/ics.png";
  iso = "/images/icons/files/iso.png";
  java = "/images/icons/files/java.png";
  js = "/images/icons/files/js.png";
  jpg = "/images/icons/files/jpg.png";
  key = "/images/icons/files/key.png";
  less = "/images/icons/files/less.png";
  mid = "/images/icons/files/mid.png";
  mp3 = "/images/icons/files/mp3.png";
  odf = "/images/icons/files/odf.png";
  ods = "/images/icons/files/ods.png";
  odt = "/images/icons/files/odt.png";
  ots = "/images/icons/files/ots.png";
  ott = "/images/icons/files/ott.png";
  pdf = "/images/icons/files/pdf.png";
  php = "/images/icons/files/php.png";
  png = "/images/icons/files/png.png";
  ppt = "/images/icons/files/ppt.png";
  py = "/images/icons/files/py.png";
  qt = "/images/icons/files/qt.png";
  rar = "/images/icons/files/rar.png";
  rb = "/images/icons/files/rb.png";
  rtf = "/images/icons/files/rtf.png";
  sass = "/images/icons/files/sass.png";
  scss = "/images/icons/files/scss.png";
  sql = "/images/icons/files/sql.png";
  tga = "/images/icons/files/tga.png";
  tif = "/images/icons/files/tiff.png";
  tiff = "/images/icons/files/tiff.png";
  txt = "/images/icons/files/txt.png";
  xls = "/images/icons/files/xls.png";
  xlsx = "/images/icons/files/xls.png";
  xml = "/images/icons/files/xml.png";
  yml = "/images/icons/files/yml.png";
  zip = "/images/icons/files/zip.png";
  constructor() {
    super({});
  }
};

// src/classes/malts/filters.ts
var FiltersMalt = class extends Malt {
  columnlist = [];
  currentrow = 0;
  finalstep = 0;
  firststep = 1;
  laststep = 0;
  maxrows = 13;
  nextstep = 0;
  page = 1;
  pages = 1;
  offset = 1;
  recordcount = 0;
  sortcol = "";
  sortdir = "asc";
  newdir = "desc";
  keywords = "";
  startrow = 1;
  totalpages = 1;
  totalrows = 0;
  tab = 1;
  constructor() {
    super({});
  }
  calculateDefaults() {
    if (this.offset < 1) {
      this.offset = 1;
    }
    if (this.sortdir == "asc") {
      this.newdir = "desc";
    } else {
      this.newdir = "asc";
    }
  }
  calculatePaging() {
    if (this.recordcount == 0) {
      this.pages = 1;
      this.page = 1;
      this.endrow = 1;
      this.offset = 1;
      this.finalstep = 1;
      this.nextstep = 1;
      this.laststep = 1;
      this.startrow = 1;
    } else if (this.maxrows == "*") {
      this.pages = 1;
      this.page = 1;
      this.endrow = this.recordcount;
      this.offset = 1;
      this.finalstep = 1;
      this.nextstep = 1;
      this.laststep = 1;
      this.startrow = 1;
    } else {
      this.pages = Math.ceil(this.recordcount / Number(this.maxrows));
      this.page = Math.ceil(this.offset / Number(this.maxrows));
      this.endrow = this.offset + Number(this.maxrows) - 1;
      if (this.endrow <= 0) {
        this.endrow = 1;
      }
      if (this.recordcount < this.endrow) {
        this.endrow = this.recordcount;
        this.finalstep = this.endrow - Number(this.maxrows) + 1;
        this.nextstep = this.endrow - Number(this.maxrows) + 1;
      } else {
        this.finalstep = this.recordcount - (Number(this.maxrows) - (this.pages * Number(this.maxrows) - this.recordcount));
        this.nextstep = this.endrow + 1;
      }
      if (this.recordcount < this.nextstep + Number(this.maxrows)) {
        this.nextstep = this.finalstep;
      }
      if (this.endrow >= this.recordcount && this.page < this.pages) {
        this.page = this.pages;
      }
    }
    if (this.laststep <= 0) {
      this.laststep = 1;
    }
    if (this.nextstep <= 0) {
      this.nextstep = 1;
    }
    this.firststep = 1;
  }
  getFilterArray(formId) {
    let r = this.getReservedColumns();
    let a = "['#" + formId + "_keywords'";
    let b = this.keysArray();
    for (let i = 0; i < b.length; i++) {
      let k = b[i];
      if (this.arrayContains(r, k)) {
        a += ",'#" + formId + "_" + k + "'";
      }
    }
    a += "]";
    return a;
  }
  getNewSortDirection(columnName) {
    let d = "asc";
    if (this.sortcol == columnName && this.sortdir == "asc") {
      d = "desc";
    }
    return d;
  }
  getReservedColumns() {
    return ["formId", "columnlist", "currentrow", "finalstep", "firststep", "laststep", "maxrows", "nextstep", "page", "pages", "offset", "recordcount", "sortcol", "sortdir", "newdir", "keywords", "sql", "startrow", "totalpages", "totalrows"];
  }
  setColumnlist(l) {
    this.columnlist = l;
  }
};

// src/classes/malts/json.ts
var JsonMalt = class extends Malt {
  statuscode = 200;
  message = "";
  data = {};
  error = false;
  code = "";
  constructor() {
    super({});
  }
};

// src/classes/malts/keys.ts
var KeysMalt = class extends Malt {
  shared;
  secret;
  crypt;
  constructor(shared, crypt) {
    super({});
    this.shared = shared;
    this.crypt = crypt;
    const k = this.getEnvironmentVariable(this.shared);
    this.secret = this.decryptKey(this.crypt, k);
  }
};

// src/classes/malts/layout.ts
var LayoutMalt = class extends Malt {
  body = { top: { left: "", center: "", right: "" }, middle: { left: "", center: "", right: "" }, bottom: { left: "", center: "", right: "" } };
  header = { left: "", center: "", right: "" };
  footer = { left: "", center: "", right: "" };
  constructor() {
    super({});
  }
};

// src/classes/malts/mailer.ts
var MailerMalt = class extends Malt {
  username;
  hash;
  password;
  port;
  from;
  sender;
  host;
  timeout;
  constructor(secret, username, hash, port, from, sender, host, timeout = 30) {
    super({});
    this.username = username;
    this.hash = hash;
    this.port = port;
    this.from = from;
    this.sender = sender;
    this.host = host;
    this.timeout = timeout;
    this.password = this.decryptKey(this.hash, secret);
  }
};

// src/classes/malts/message.ts
var MessageMalt = class extends Malt {
  constructor() {
    super({});
  }
};

// src/classes/malts/mimes.ts
var MimesMalt = class extends Malt {
  "3gp" = "video/3gpp";
  "7z" = "application/x-7z-compressed";
  aac = "audio/x-aac";
  ac = "application/pkix-attr-cert";
  asp = "text/plain";
  ai = "application/postscript";
  aif = "audio/x-aiff";
  aifc = "audio/x-aiff";
  aiff = "audio/x-aiff";
  air = "application/vnd.adobe.air-application-installer-package+zip";
  ait = "application/vnd.dvb.ait";
  apk = "application/vnd.android.package-archive";
  asf = "video/x-ms-asf";
  asc = "text/plain";
  atom = "application/atom+xml";
  au = "audio/basic";
  avi = "video/x-msvideo";
  azw = "application/vnd.amazon.ebook";
  bcpio = "application/x-bcpio";
  bin = "application/octet-stream";
  bmi = "application/vnd.bmi";
  bmp = "image/bmp";
  c = "text/plain";
  cab = "application/vnd.ms-cab-compressed";
  cc = "text/plain";
  ccad = "application/clariscad";
  cdf = "application/x-netcdf";
  cfm = "text/plain";
  cgm = "image/cgm";
  chm = "application/vnd.ms-htmlhelp";
  class = "application/java-vm";
  cmx = "image/x-cmx";
  cpio = "application/x-cpio";
  cpt = "application/mac-compactpro";
  crd = "application/x-mscardfile";
  csh = "application/x-csh";
  css = "text/css";
  csv = "text/csv";
  dat = "application/octet-stream";
  dcr = "application/x-director";
  der = "application/x-x509-ca-cert";
  dir = "application/x-director";
  dms = "application/octet-stream";
  doc = "application/msword";
  docm = "application/vnd.ms-word.document.macroenabled.12";
  docx = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  dotm = "application/vnd.ms-word.template.macroenabled.12";
  drw = "application/drafting";
  dtd = "application/xml-dtd";
  dvi = "application/x-dvi";
  dwf = "model/vnd.dwf";
  dwg = "image/vnd.dwg";
  dxf = "application/dxf";
  dxr = "application/x-director";
  eps = "application/postscript";
  epub = "application/epub+zip";
  eml = "message/rfc822";
  eot = "application/vnd.ms-fontobject";
  etx = "text/x-setext";
  exe = "application/octet-stream";
  ez = "application/andrew-inset";
  f = "text/plain";
  f4v = "video/x-f4v";
  f90 = "text/plain";
  fh = "image/x-freehand";
  fli = "video/x-fli";
  flv = "video/x-flv";
  fpx = "image/vnd.fpx";
  fxp = "application/vnd.adobe.fxp";
  g3 = "image/g3fax";
  gif = "image/gif";
  gtar = "application/x-gtar";
  gv = "text/vnd.graphviz";
  gz = "application/x-gzip";
  h = "text/plain";
  hdf = "application/x-hdf";
  hh = "text/plain";
  hqx = "application/mac-binhex40";
  htm = "text/html";
  html = "text/html";
  ice = "x-conference/x-cooltalk";
  ico = "image/x-icon";
  ics = "text/calendar";
  ief = "image/ief";
  iges = "model/iges";
  igs = "model/iges";
  igx = "application/vnd.micrografx.igx";
  indd = "application/x-indesign";
  ips = "application/x-ipscript";
  ipx = "application/x-ipix";
  iso = "application/octet-stream";
  jad = "text/vnd.sun.j2me.app-descriptor";
  jar = "application/java-archive";
  java = "ext/x-java-source,java";
  jnlp = "application/x-java-jnlp-file";
  jpe = "image/jpg";
  jpeg = "image/jpg";
  jpg = "image/jpg";
  jpgv = "video/jpg";
  jpm = "video/jpm";
  js = "application/x-javascript";
  json = "application/json";
  jsp = "text/plain";
  kar = "audio/midi";
  kml = "application/vnd.google-earth.kml+xml";
  kmz = "application/vnd.google-earth.kmz";
  latex = "application/x-latex";
  lha = "application/octet-stream";
  log = "text/plain";
  lsp = "application/x-lisp";
  lzh = "application/octet-stream";
  m = "text/plain";
  m3u = "audio/x-mpegurl";
  m4v = "video/x-m4v";
  man = "application/x-troff-man";
  mdb = "application/x-msaccess";
  mdi = "image/vnd.ms-modi";
  me = "application/x-troff-me";
  mesh = "model/mesh";
  mid = "audio/midi";
  midi = "audio/midi";
  mif = "application/vnd.mif";
  mime = "www/mime";
  mkv = "video/x-matroska";
  mlp = "application/vnd.dolby.mlp";
  mov = "video/quicktime";
  movie = "video/x-sgi-movie";
  mp2 = "audio/mpeg";
  mp3 = "audio/mpeg";
  mp4 = "video/mp4";
  mpe = "video/mpeg";
  mpeg = "video/mpeg";
  mpkg = "application/vnd.apple.installer+xml";
  mpg = "video/mpeg";
  mpga = "audio/mpeg";
  ms = "application/x-troff-ms";
  msh = "model/mesh";
  mxml = "audio/mpeg";
  nc = "application/x-netcdf";
  oda = "application/oda";
  oga = "audio/ogg";
  ogv = "video/ogg";
  ogx = "application/ogg";
  pbd = "application/vnd.powerbuilder6";
  pbm = "image/x-portable-bitmap";
  pct = "image/x-pict";
  pdb = "chemical/x-pdb";
  pdf = "application/pdf";
  pfa = "application/x-font-type1";
  pgm = "image/x-portable-graymap";
  pgn = "application/x-chess-pgn";
  pgp = "application/pgp-signature";
  php = "text/plain";
  pic = "image/x-pict";
  pl = "text/plain";
  png = "image/png";
  pnm = "image/x-portable-anymap";
  pot = "application/mspowerpoint";
  potx = "application/vnd.openxmlformats-officedocument.presentationml.template";
  ppd = "application/vnd.cups-ppd";
  ppm = "image/x-portable-pixmap";
  pps = "application/mspowerpoint";
  ppsx = "application/vnd.openxmlformats-officedocument.presentationml.slideshow";
  ppt = "application/mspowerpoint";
  pptx = "application/vnd.openxmlformats-officedocument.presentationml.presentation";
  ppz = "application/mspowerpoint";
  pre = "application/x-freelance";
  prt = "application/pro_eng";
  ps = "application/postscript";
  psb = "image/vnd.adobe.photoshop";
  psd = "image/vnd.adobe.photoshop";
  pub = "application/x-mspublisher";
  qfx = "application/vnd.intu.qfx";
  qt = "video/quicktime";
  qxd = "application/vnd.quark.quarkxpress";
  ra = "audio/x-realaudio";
  ram = "audio/x-pn-realaudio";
  rar = "application/x-rar-compressed";
  ras = "image/cmu-raster";
  rgb = "image/x-rgb";
  rm = "audio/x-pn-realaudio";
  roff = "application/x-troff";
  rpm = "audio/x-pn-realaudio-plugin";
  rss = "application/rss+xml";
  rtf = "text/rtf";
  rtx = "text/richtext";
  scd = "application/x-msschedule";
  scm = "application/x-lotusscreencam";
  ser = "application/java-serialized-object";
  set = "application/set";
  sgm = "text/sgml";
  sgml = "text/sgml";
  sh = "application/x-sh";
  shar = "application/x-shar";
  silo = "model/mesh";
  sit = "application/x-stuffit";
  sitx = "application/x-stuffitx";
  skd = "application/x-koan";
  skm = "application/x-koan";
  skp = "application/x-koan";
  skt = "application/x-koan";
  smi = "application/smil";
  smil = "application/smil";
  snd = "audio/basic";
  sol = "application/solids";
  spl = "application/x-futuresplash";
  src = "application/x-wais-source";
  step = "application/STEP";
  stl = "application/SLA";
  stp = "application/STEP";
  sv4cpio = "application/x-sv4cpio";
  sv4crc = "application/x-sv4crc";
  svg = "image/svg+xml";
  swf = "application/x-shockwave-flash";
  t = "application/x-troff";
  tar = "application/x-tar";
  tcl = "application/x-tcl";
  tex = "application/x-tex";
  texi = "application/x-texinfo";
  texinfo = "application/x-texinfo";
  tif = "image/tiff";
  tiff = "image/tiff";
  torrent = "application/x-bittorrent";
  tr = "application/x-troff";
  tsi = "audio/TSP-audio";
  tsp = "application/dsptype";
  tsv = "text/tab-separated-values";
  ttf = "application/x-font-ttf";
  txt = "text/plain";
  unv = "application/i-deas";
  ustar = "application/x-ustar";
  vcd = "application/x-cdlink";
  vcf = "text/x-vcard";
  vcs = "text/x-vcalendar";
  vda = "application/vda";
  viv = "video/vnd.vivo";
  vivo = "video/vnd.vivo";
  vrml = "model/vrml";
  vsd = "application/vnd.visio";
  wav = "audio/x-wav";
  weba = "audio/webm";
  webm = "video/webm";
  wm = "video/x-ms-wm";
  wma = "audio/x-ms-wma";
  wmd = "application/x-ms-wmd";
  wmf = "application/x-msmetafile";
  wml = "text/vnd.wap.wml";
  wmlc = "application/vnd.wap.wmlc";
  wmls = "text/vnd.wap.wmlscript";
  wmv = "video/x-ms-wmv";
  wmx = "video/x-ms-wmx";
  woff = "application/x-font-woff";
  wpd = "application/vnd.wordperfect";
  wpl = "application/vnd.ms-wpl";
  wps = "application/vnd.ms-works";
  wri = "application/x-mswrite";
  wrl = "model/vrml";
  wsdl = "application/wsdl+xml";
  wvx = "video/x-ms-wvx";
  xap = "application/x-silverlight-app";
  xbm = "image/x-xbitmap";
  xdp = "application/vnd.adobe.xdp+xml";
  xfdf = "application/vnd.adobe.xfdf";
  xhtml = "application/xhtml+xml";
  xif = "image/vnd.xiff";
  xlam = "application/vnd.ms-excel.addin.macroenabled.12";
  xlc = "application/vnd.ms-excel";
  xll = "application/vnd.ms-excel";
  xlm = "application/vnd.ms-excel";
  xls = "application/vnd.ms-excel";
  xlsb = "application/vnd.ms-excel.sheet.binary.macroenabled.12";
  xlsm = "application/vnd.ms-excel.sheet.macroEnabled.12";
  xlsx = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  xltm = "application/vnd.ms-excel.template.macroenabled.12";
  xlw = "application/vnd.ms-excel";
  xml = "application/xml";
  xpm = "image/x-xpixmap";
  xps = "application/vnd.ms-xpsdocument";
  xslt = "application/xslt+xml";
  xul = "application/vnd.mozilla.xul+xml";
  xwd = "image/x-xwindowdump";
  xyz = "chemical/x-pdb";
  yaml = "text/yaml";
  zip = "application/zip";
  constructor() {
    super({});
  }
};

// src/classes/malts/params.ts
var ParamsMalt = class extends Malt {
  action = "";
  mode = "skin";
  search = false;
  route = "";
  flags = false;
  task = "";
  nonce = 0;
  jwt = "";
  format = "";
  keywords = "";
  constructor(o = {}) {
    super(o);
  }
};

// src/classes/malts/query.ts
var QueryMalt = class extends Malt {
  row = {};
  rows = [];
  recordcount = 0;
  filters = new FiltersMalt();
  sql = "";
  menus = {};
  columns = [];
  constructor() {
    super({});
  }
  calculateRecordcount() {
    this.recordcount = this.rows.length;
  }
  setSail(s) {
    if (s.hasProperty("filters")) {
      this.filters.mergeProperties(s.filters);
    }
    if (s.hasProperty("rows")) {
      this.setRows(s.rows);
    }
  }
  setRows(a) {
    this.rows = a;
    this.calculateRecordcount();
  }
};

// src/classes/malts/route.ts
var RouteMalt = class extends Malt {
  id;
  title;
  format;
  section;
  handler;
  level;
  constructor(id, title, format, level) {
    super({});
    this.id = id;
    this.title = title;
    this.format = format;
    this.level = level;
    const a = this.id.split("_");
    this.handler = a[a.length - 1];
    this.section = "";
    for (let i = 0; i < a.length - 1; i++) {
      if (i > 0) {
        this.section += "_";
      }
      this.section += a[i];
    }
  }
};

// src/classes/malts/section.ts
var SectionMalt = class extends Malt {
  id;
  parent;
  title;
  icon;
  primary;
  foreign;
  constructor(id, parent = "", title, icon = "", primary, foreign = "") {
    super({});
    this.id = id;
    this.parent = parent;
    this.title = title;
    this.icon = icon;
    this.primary = primary;
    this.foreign = foreign;
  }
};

// src/classes/malts/share.ts
var ShareMalt = class extends Malt {
  share_pool = "";
  share_account = "";
  share_amount = 0;
  share_coin = 0;
  share_counter = 0;
  constructor() {
    super({});
  }
};

// src/classes/malts/trade.ts
var TradeMalt = class extends Malt {
  trade_id = "";
  trade_type = "";
  trade_date = this.getDateNow();
  trade_offer = "";
  trade_seller = "";
  trade_buyer = "";
  trade_price = 0;
  base_offer = "";
  base_pool = "";
  base_account = "";
  base_coin = "";
  base_alpha = "";
  base_code = "";
  base_issuer = "";
  base_amount = 0;
  counter_offer = "";
  counter_pool = "";
  counter_account = "";
  counter_coin = "";
  counter_alpha = "";
  counter_issuer = "";
  counter_amount = 0;
  constructor() {
    super({});
  }
  menuTradeTypes() {
    return { orderBook: "Order Book", liquidityPool: "Liquidity Pool" };
  }
};
export {
  AccountMalt,
  AgentMalt,
  AnalyticMalt,
  AnalyticsMalt,
  BidMalt,
  BlockMalt,
  BookMalt,
  ChartMalt,
  ClaimableMalt,
  coin_default as CoinMalt,
  ErrorsMalt,
  ExtensionsMalt,
  FaultMalt,
  FiltersMalt,
  JsonMalt,
  KeysMalt,
  LayoutMalt,
  MailerMalt,
  Malt,
  MessageMalt,
  MimesMalt,
  ParamsMalt,
  QueryMalt,
  RouteMalt,
  SectionMalt,
  ShareMalt,
  TradeMalt
};
//# sourceMappingURL=index.js.map