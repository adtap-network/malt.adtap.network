import Malt from "../malt";

export default class TradeMalt extends Malt {

    trade_id: string					= '';
    trade_type: string					= '';
    trade_date: string					= this.getDateNow();
    trade_offer: string					= '';
    trade_seller: string				= '';
    trade_buyer: string					= '';
    trade_price: number					= 0;
    base_offer: string					= '';
    base_pool: string					= '';
    base_account: string				= '';
    base_coin: string					= '';
    base_alpha: string					= '';
    base_code: string					= '';
    base_issuer: string					= '';
    base_amount: number					= 0;
    counter_offer: string				= '';
    counter_pool: string				= '';
    counter_account: string				= '';
    counter_coin: string				= '';
    counter_alpha: string				= '';
    counter_issuer: string				= '';
    counter_amount: number				= 0;
    
    constructor() { super({}); }

	menuTradeTypes() { return {orderBook: 'Order Book', liquidityPool: 'Liquidity Pool'}; }

}