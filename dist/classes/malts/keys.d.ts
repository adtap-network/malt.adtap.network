import Malt from '../malt';
import { KeysMaltInterface } from '../../interfaces/malts/keys';
export default class KeysMalt extends Malt implements KeysMaltInterface {
    shared: string;
    secret: string;
    crypt: string;
    constructor(shared: string, crypt: string);
}
//# sourceMappingURL=keys.d.ts.map