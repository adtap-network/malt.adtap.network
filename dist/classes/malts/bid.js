import Malt from "../malt";
export default class BidMalt extends Malt {
    bid_id = '';
    bid_account = '';
    bid_selling = '';
    bid_buying = '';
    bid_amount = 0;
    bid_price = 0;
    bid_updatedon = this.getDateNow();
    coin_id = '';
    coin_name = '';
    coin_code = '';
    coin_issuer = '';
    coin_alpha = '';
    coin_domain = '';
    coin_image = '/images/coins/none.png';
    coin_price = 0;
    counter_id = '';
    counter_name = '';
    counter_code = '';
    counter_issuer = '';
    counter_alpha = '';
    counter_domain = '';
    counter_image = '/images/coins/none.png';
    counter_price = 0;
    constructor() { super({}); }
    setCoin(t) { this.mergeProperties(t); }
    setCounter(t) { let o = this.replaceKeys(t, 'coin_', 'counter_'); this.mergeProperties(o); }
}
//# sourceMappingURL=bid.js.map