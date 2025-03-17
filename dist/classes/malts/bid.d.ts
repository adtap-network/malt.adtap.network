import Malt from "../malt";
export default class BidMalt extends Malt {
    bid_id: string;
    bid_account: string;
    bid_selling: string;
    bid_buying: string;
    bid_amount: number;
    bid_price: number;
    bid_updatedon: string;
    coin_id: string;
    coin_name: string;
    coin_code: string;
    coin_issuer: string;
    coin_alpha: string;
    coin_domain: string;
    coin_image: string;
    coin_price: number;
    counter_id: string;
    counter_name: string;
    counter_code: string;
    counter_issuer: string;
    counter_alpha: string;
    counter_domain: string;
    counter_image: string;
    counter_price: number;
    constructor();
    setCoin(t: {
        [key: string]: any;
    }): void;
    setCounter(t: {
        [key: string]: any;
    }): void;
}
//# sourceMappingURL=bid.d.ts.map