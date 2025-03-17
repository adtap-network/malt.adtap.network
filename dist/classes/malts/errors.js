import Malt from "../malt";
import FaultMalt from "./fault";
export default class ErrorsMalt extends Malt {
    admin = false;
    codes = {
        c001: { code: 'c001', type: "error", message: "unable to connect to remote host." },
        c002: { code: 'c002', type: "error", message: "unable to connect to webnative server." },
        c003: { code: 'c003', type: "error", message: "unable to connect to the mysql database." },
        c004: { code: 'c004', type: "error", message: "unable to connect to the gmg cozone api." },
        c005: { code: 'c005', type: "error", message: "unable to verify identity of host (ssl handshake failed)." }
    };
    counter = 0;
    dump = true;
    errors = [];
    settings = { filename: 'rocket.log', directory: 'D:\\Inetpub\\media\\logs', filepath: 'D:\\Inetpub\\media\\logs\\rocket.log' };
    constructor() { super({}); }
    addError(error) { this.errors.push(error); }
    clearErrors() { this.errors = []; this.resetCounter(); }
    createError(code, file, func, msg) {
        return new FaultMalt(msg, file, func);
    }
    createLog() {
        let content = 'date,type,file,function,message' + String.fromCharCode(10);
        this.writeFile(this.settings.filepath, content);
    }
    decrementCounter() { if (this.counter > 0) {
        this.counter--;
    } }
    getCurrentError() { return this.getError(this.counter); }
    getError(index) { let e = {}; if (index <= this.getErrorCount()) {
        let e = this.errors[index];
    } return e; }
    getErrorCount() { return this.errors.length; }
    getErrors() { return this.errors; }
    getSettings() { return this.settings; }
    incrementCounter() { this.counter++; }
    logException(e, file, func, type = 'error', dump = true) {
        const msg = e.message;
        let c = this.getLog();
        c += this.getDateNow() + ',' + type + ',' + file + ',' + func + ',' + msg.replace(/,/g, '') + String.fromCharCode(10);
        this.writeFile(this.settings.filepath, c);
        if (dump == true) {
            this.dumpException(msg, file, func, type);
        }
    }
    nextError() { let e = this.getCurrentError(); this.incrementCounter(); return e; }
    previousError() { this.decrementCounter(); return this.getCurrentError(); }
    resetCounter() { this.counter = 0; }
    setSettings(settings) { this.settings = settings; }
}
//# sourceMappingURL=errors.js.map