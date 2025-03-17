import Malt from "../malt";
export default class JsonMalt extends Malt {
    statuscode: number;
    message: string;
    data: {
        [key: string]: any;
    };
    error: boolean;
    code: string;
    constructor();
}
//# sourceMappingURL=json.d.ts.map