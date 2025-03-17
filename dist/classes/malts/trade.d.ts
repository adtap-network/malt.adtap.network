import Malt from "../malt";
export default class TradeMalt extends Malt {
    trade_id: string;
    trade_type: string;
    trade_date: string;
    trade_offer: string;
    trade_seller: string;
    trade_buyer: string;
    trade_price: number;
    base_offer: string;
    base_pool: string;
    base_account: string;
    base_coin: string;
    base_alpha: string;
    base_code: string;
    base_issuer: string;
    base_amount: number;
    counter_offer: string;
    counter_pool: string;
    counter_account: string;
    counter_coin: string;
    counter_alpha: string;
    counter_issuer: string;
    counter_amount: number;
    constructor();
    menuTradeTypes(): {
        orderBook: string;
        liquidityPool: string;
    };
}
//# sourceMappingURL=trade.d.ts.map