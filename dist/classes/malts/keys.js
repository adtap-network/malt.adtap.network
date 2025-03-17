import Malt from '../malt';
export default class KeysMalt extends Malt {
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
}
//# sourceMappingURL=keys.js.map