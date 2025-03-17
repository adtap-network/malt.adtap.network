import Malt from "../malt";

export default class BookMalt extends Malt {

    totalAsks: number						= 0;
    totalBids: number						= 0;
    asks: {[key: string]: any}[]  			= [];
    bids: {[key: string]: any}[]			= [];
    base: {[key: string]: any}	    		= {};
    counter: {[key: string]: any}			= {};

    constructor() { super({}); }

    addAsk(a: {[key: string]: any}): number { this.asks.push(a); return this.countAsks(); }

	addBid(a: {[key: string]: any}): number { this.bids.push(a); return this.countBids(); }

	countAsks(): number { this.totalAsks = this.asks.length; return this.totalAsks; }

	countBids(): number { this.totalBids = this.bids.length; return this.totalBids; }

	getHighestBuyPrice(): number {
		let i = 0;
		let a = this.listSellOffers();
		if(a.length > 0) {
			let o = a[0];
			if(o.price > 0) { i = this.formatLumens(1/o.price); }
		}
		return i;
	}

	getLowestSellPrice(): number {
		let i = 0;
		let a = this.listBuyOffers();
		if(a.length > 0) {
			let o = a[0];
			if(o.price > 0) { i = this.formatLumens(1/o.price); }
		}
		return i;
	}

	getSpreadAmount(): number {
		let i = 0;
		let b = this.getHighestBuyPrice();
		let s = this.getLowestSellPrice();
		i = this.formatLumens(s - b);
		return i;
	}

	getSpreadPercent(): number {
		let i = 0;
		let b = this.getHighestBuyPrice();
		let d = this.getSpreadAmount();
		if(d > 0 && b > 0) { i = this.formatDecimal((d / b) * 100); }
		return i;
	}

	listBuyOffers(): {[key: string]: any}[] {
		let i = 0;
		let a: {[key: string]: any}[] = [];
		for(let n=0; n<this.bids.length; n++) {
            let o = this.bids[n];
			if(this.isNumeric(o.price) && o.price > 0) {
				let p = 1/o.price;
				if(p < i) { i = p; a.unshift(o); }
				else if(p >= 0.0000001) { a.push(o); }
			}
		}
		return a;
	}

	listSellOffers(): {[key: string]: any}[] {
		let i = 0;
		let a: {[key: string]: any}[] = [];
		for(let n=0; n<this.asks.length; n++) {
            let o = this.asks[n];
            if(this.isNumeric(o.price) && o.price > 0) {
				if(o.price > i) { i = o.price; a.push(o); }
				else { a.unshift(o); }
			}
		}
		return a;
	}

	setAsks(a: {[key: string]: any}[]): number { this.asks = a; return this.countAsks(); }

	setBids(a: {[key: string]: any}[]): number { this.bids = a; return this.countBids(); }

	compareAsks(a: {[key: string]: any}, b: {[key: string]:any}): number { return a.price - b.price; }

	compareBids(a: {[key: string]: any}, b: {[key: string]:any}): number { return b.price - a.price; }

	sortAsks(): void {
		let a: {[key: string]: any}[] = [];
		for(let i=0; i<this.asks.length; i++) {
            let b = this.asks[i];
			if(this.isNumeric(b.price) && b.price > 0.0000001) { a.push(b); }
		}
		this.setAsks(a);
		this.asks.sort(this.compareAsks.bind(this));
	}

	sortBids(): void {
		let a: {[key: string]: any}[] = [];
		for(let i=0; i<this.bids.length; i++) {
            let b = this.bids[i];
			if(this.isNumeric(b.price) && b.price > 0.0000001) { a.push(b); }
		}
		this.setBids(a);
		this.bids.sort(this.compareBids.bind(this));
	}

}