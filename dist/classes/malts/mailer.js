import Malt from '../malt';
export default class MailerMalt extends Malt {
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
}
//# sourceMappingURL=mailer.js.map