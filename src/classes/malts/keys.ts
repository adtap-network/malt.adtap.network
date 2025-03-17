import Malt from '../malt';
import KeysMaltInterface from '../../interfaces/malts/keys';

export default class KeysMalt extends Malt implements KeysMaltInterface {

    shared: string; 
    secret: string; 
    crypt: string ;

    constructor(shared: string, crypt: string) {
        super({});
        this.shared = shared;
        this.crypt = crypt;        
        const k = this.getEnvironmentVariable(this.shared);
        this.secret = this.decryptKey(this.crypt, k);
    }

}