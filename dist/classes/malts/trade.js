import Malt from "../malt";
export default class TradeMalt extends Malt {
    trade_id = '';
    trade_type = '';
    trade_date = this.getDateNow();
    trade_offer = '';
    trade_seller = '';
    trade_buyer = '';
    trade_price = 0;
    base_offer = '';
    base_pool = '';
    base_account = '';
    base_coin = '';
    base_alpha = '';
    base_code = '';
    base_issuer = '';
    base_amount = 0;
    counter_offer = '';
    counter_pool = '';
    counter_account = '';
    counter_coin = '';
    counter_alpha = '';
    counter_issuer = '';
    counter_amount = 0;
    constructor() { super({}); }
    menuTradeTypes() { return { orderBook: 'Order Book', liquidityPool: 'Liquidity Pool' }; }
}
//# sourceMappingURL=trade.js.map