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

    constructor(secret: string, username: string, hash: string, port: number, from: string, sender: string, host: string, timeout: number = 30) {
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