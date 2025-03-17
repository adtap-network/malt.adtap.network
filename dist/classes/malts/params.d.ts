import Malt from "../malt";
export default class ParamsMalt extends Malt {
    action: string;
    mode: string;
    search: boolean;
    route: string;
    flags: boolean;
    task: string;
    nonce: number;
    jwt: string;
    format: string;
    keywords: string;
    constructor(o?: {
        [key: string]: any;
    });
}
//# sourceMappingURL=params.d.ts.map