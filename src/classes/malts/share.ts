import Malt from "../malt";

export default class ShareMalt extends Malt {

    share_pool:string		= '';
    share_account: string   = '';
    share_amount: number    = 0;
    share_coin: number      = 0;
    share_counter: number	= 0;

    constructor() { super({}); }

}