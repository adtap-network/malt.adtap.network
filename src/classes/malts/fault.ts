import Malt from '../malt';
import FaultMaltInterface from '../../interfaces/malts/fault';

export default class FaultMalt extends Malt implements FaultMaltInterface {

    file: string;
    func: string;
    message: string;
    date: string;

    constructor(message: string, file: string, func: string) {
        super({});
        this.message = message;
        this.file = file;
        this.func = func;
        this.date = this.getDateNow();
    }

}