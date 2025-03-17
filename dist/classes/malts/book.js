import Malt from "../malt";
export default class BookMalt extends Malt {
    totalAsks = 0;
    totalBids = 0;
    asks = [];
    bids = [];
    base = {};
    counter = {};
    constructor() { super({}); }
    addAsk(a) { this.asks.push(a); return this.countAsks(); }
    addBid(a) { this.bids.push(a); return this.countBids(); }
    countAsks() { this.totalAsks = this.asks.length; return this.totalAsks; }
    countBids() { this.totalBids = this.bids.length; return this.totalBids; }
    getHighestBuyPrice() {
        let i = 0;
        let a = this.listSellOffers();
        if (a.length > 0) {
            let o = a[0];
            if (o.price > 0) {
                i = this.formatLumens(1 / o.price);
            }
        }
        return i;
    }
    getLowestSellPrice() {
        let i = 0;
        let a = this.listBuyOffers();
        if (a.length > 0) {
            let o = a[0];
            if (o.price > 0) {
                i = this.formatLumens(1 / o.price);
            }
        }
        return i;
    }
    getSpreadAmount() {
        let i = 0;
        let b = this.getHighestBuyPrice();
        let s = this.getLowestSellPrice();
        i = this.formatLumens(s - b);
        return i;
    }
    getSpreadPercent() {
        let i = 0;
        let b = this.getHighestBuyPrice();
        let d = this.getSpreadAmount();
        if (d > 0 && b > 0) {
            i = this.formatDecimal((d / b) * 100);
        }
        return i;
    }
    listBuyOffers() {
        let i = 0;
        let a = [];
        for (let n = 0; n < this.bids.length; n++) {
            let o = this.bids[n];
            if (this.isNumeric(o.price) && o.price > 0) {
                let p = 1 / o.price;
                if (p < i) {
                    i = p;
                    a.unshift(o);
                }
                else if (p >= 0.0000001) {
                    a.push(o);
                }
            }
        }
        return a;
    }
    listSellOffers() {
        let i = 0;
        let a = [];
        for (let n = 0; n < this.asks.length; n++) {
            let o = this.asks[n];
            if (this.isNumeric(o.price) && o.price > 0) {
                if (o.price > i) {
                    i = o.price;
                    a.push(o);
                }
                else {
                    a.unshift(o);
                }
            }
        }
        return a;
    }
    setAsks(a) { this.asks = a; return this.countAsks(); }
    setBids(a) { this.bids = a; return this.countBids(); }
    compareAsks(a, b) { return a.price - b.price; }
    compareBids(a, b) { return b.price - a.price; }
    sortAsks() {
        let a = [];
        for (let i = 0; i < this.asks.length; i++) {
            let b = this.asks[i];
            if (this.isNumeric(b.price) && b.price > 0.0000001) {
                a.push(b);
            }
        }
        this.setAsks(a);
        this.asks.sort(this.compareAsks.bind(this));
    }
    sortBids() {
        let a = [];
        for (let i = 0; i < this.bids.length; i++) {
            let b = this.bids[i];
            if (this.isNumeric(b.price) && b.price > 0.0000001) {
                a.push(b);
            }
        }
        this.setBids(a);
        this.bids.sort(this.compareBids.bind(this));
    }
}
//# sourceMappingURL=book.js.map