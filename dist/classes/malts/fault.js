import Malt from '../malt';
export default class FaultMalt extends Malt {
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
}
//# sourceMappingURL=fault.js.map