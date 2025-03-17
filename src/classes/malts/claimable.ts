import Malt from "../malt";

export default class ClaimableMalt extends Malt {

    claim_id: string                = '';
    claim_account: string	        = '';
    claim_coin: string		        = '';
    claim_amount: number	        = 0;
    claim_xlm: number		        = 0;
    claim_usd: number		        = 0;
    claim_expires: boolean	        = false;
    claim_expireson: string         = '';
    claim_unlocks: boolean	        = false;
    claim_unlockson: string			= '';
    claim_sponsor: string			= '';

    coin_id: string               	= '';
    coin_class: string				= '';
    coin_code: string             	= '';
    coin_issuer: string           	= '';
    coin_name: string             	= '';
    coin_alpha: string				= '';
    coin_domain: string				= '';
    coin_descr: string            	= '';
    coin_conditions: string       	= '';
    coin_redemption: string       	= '';
    coin_image: string            	= '';
    coin_supply: string           	= '';
    coin_price: number				= 0;
    coin_xlm: number				= 0;
    coin_usd: number				= 0;
    
    constructor() { super({}); }

}