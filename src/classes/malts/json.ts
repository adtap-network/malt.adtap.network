import Malt from "../malt";

export default class JsonMalt extends Malt {

    statuscode: number              = 200;
    message: string                 = '';
    data: {[key: string]: any}      = {};
	error: boolean			        = false;
	code: string			        = '';

    constructor() { super({}); }
    
}