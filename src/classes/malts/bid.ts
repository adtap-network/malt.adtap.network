import Malt from "../malt";

export default class BidMalt extends Malt {

    bid_id: string				 = '';
    bid_account: string          = '';
    bid_selling: string          = '';
    bid_buying: string           = '';
    bid_amount: number           = 0;
    bid_price: number            = 0;
    bid_updatedon: string        = this.getDateNow();

    coin_id: string               = '';
    coin_name: string             = '';
    coin_code: string             = '';
    coin_issuer: string           = '';
    coin_alpha: string            = '';
    coin_domain: string           = '';
    coin_image: string            = '/images/coins/none.png';
    coin_price: number			  = 0;

    counter_id: string            = '';
    counter_name: string          = '';
    counter_code: string          = '';
    counter_issuer: string        = '';
    counter_alpha: string         = '';
    counter_domain: string        = '';
    counter_image: string         = '/images/coins/none.png';
    counter_price: number		  = 0;
    
    constructor() { super({}); }

    setCoin(t: {[key: string]: any}): void { this.mergeProperties(t); }

	setCounter(t: {[key: string]: any}): void { let o = this.replaceKeys(t, 'coin_', 'counter_'); this.mergeProperties(o); }
}