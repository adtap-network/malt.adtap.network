import Malt from "../malt";

export default class ParamsMalt extends Malt {

    action: string                  = "";
    mode: string                    = "skin";
    search: boolean                 = false;
    route: string                   = "";
    flags: boolean                  = false; 
    task: string                    = "";
    nonce: number                   = 0;
    jwt: string                     = "";
    format: string                  = "";
    keywords: string                = "";

    constructor(o: {[key: string]: any} = {}) { super(o); }
}