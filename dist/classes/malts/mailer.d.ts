import Malt from '../malt';
import { MailerMaltInterface } from '../../interfaces/malts/mailer';
export default class MailerMalt extends Malt implements MailerMaltInterface {
    username: string;
    hash: string;
    password: string;
    port: number;
    from: string;
    sender: string;
    host: string;
    timeout: number;
    constructor(secret: string, username: string, hash: string, port: number, from: string, sender: string, host: string, timeout?: number);
}
//# sourceMappingURL=mailer.d.ts.map