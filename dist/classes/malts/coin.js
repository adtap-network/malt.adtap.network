import Malt from '../malt';
class Coin extends Malt {
    constructor(a = {}) {
        super(a);
        this.setDefaultProperty('CoinId', '');
        this.setDefaultProperty('CoinAccount', '');
        this.setDefaultProperty('CoinClass', '');
        this.setDefaultProperty('CoinType', '');
        this.setDefaultProperty('CoinGroup', '');
        this.setDefaultProperty('CoinReserves', '');
        this.setDefaultProperty('CoinStatus', '');
        this.setDefaultProperty('CoinStripe', '');
        this.setDefaultProperty('CoinQuote', '');
        this.setDefaultProperty('CoinCode', '');
        this.setDefaultProperty('CoinIssuer', '');
        this.setDefaultProperty('CoinAlpha', '');
        this.setDefaultProperty('CoinName', '');
        this.setDefaultProperty('CoinDomain', '');
        this.setDefaultProperty('CoinDescr', '');
        this.setDefaultProperty('CoinConditions', '');
        this.setDefaultProperty('CoinRedemption', '');
        this.setDefaultProperty('CoinAttestation', '');
        this.setDefaultProperty('CoinHtml', '');
        this.setDefaultProperty('CoinImage', 'images/coins/NONE.png');
        this.setDefaultProperty('CoinThumb', 'images/coins/NONE.png');
        this.setDefaultProperty('CoinSupply', 0);
        this.setDefaultProperty('CoinMin', 0);
        this.setDefaultProperty('CoinMax', 0);
        this.setDefaultProperty('CoinLiquidity', 0);
        this.setDefaultProperty('CoinFee', 0);
        this.setDefaultProperty('CoinPrice', 0);
        this.setDefaultProperty('CoinSpread', 0.05);
        this.setDefaultProperty('CoinYield', 0);
        this.setDefaultProperty('CoinFeatured', 0);
        this.setDefaultProperty('CoinAuth', 0);
        this.setDefaultProperty('CoinFetchedon', 0);
        this.setDefaultProperty('CoinXlm', 0);
        this.setDefaultProperty('CoinUsd', 0);
        this.setDefaultProperty('CoinXau', 0);
        this.setDefaultProperty('CoinXag', 0);
        this.setDefaultProperty('CoinBtc', 0);
        this.setDefaultProperty('CoinSol', 0);
        this.setDefaultProperty('CoinEth', 0);
        this.setDefaultProperty('CoinEur', 0);
        this.setDefaultProperty('CoinAmount', 0);
        this.setDefaultProperty('CoinReserved', 0);
        this.setDefaultProperty('CoinAvailable', 0);
        this.setDefaultProperty('CoinSelling', 0);
        this.setDefaultProperty('CoinBuying', 0);
        this.setDefaultProperty('CoinPooled', 0);
        this.setDefaultProperty('CoinBalance', 0);
        this.setDefaultProperty('TotalHolders', 0);
        this.setDefaultProperty('TotalMarkets', 0);
        this.setDefaultProperty('TotalOperations', 0);
        this.setDefaultProperty('TotalPayments', 0);
        this.setDefaultProperty('TotalPools', 0);
        this.setDefaultProperty('TotalRatings', 0);
        this.setDefaultProperty('TotalTrades', 0);
        this.setDefaultProperty('Holders', []);
        this.setDefaultProperty('Markets', []);
        this.setDefaultProperty('Pools', []);
        this.setDefaultProperty('Ratings', []);
        this.setDefaultProperty('Trades', []);
    }
    countHolders() { this.TotalHolders = this.Holders.length; return this.TotalHolders; }
    countMarkets() { this.TotalMarkets = this.Markets.length; return this.TotalMarkets; }
    countPools() { this.TotalPools = this.Pools.length; return this.TotalPools; }
    countRatings() { this.TotalRatings = this.Ratings.length; return this.TotalRatings; }
    countTrades() { this.TotalTrades = this.Trades.length; return this.TotalTrades; }
}
export default Coin;
//# sourceMappingURL=coin.js.map