import Malt from "../malt";
export default class BookMalt extends Malt {
    totalAsks: number;
    totalBids: number;
    asks: {
        [key: string]: any;
    }[];
    bids: {
        [key: string]: any;
    }[];
    base: {
        [key: string]: any;
    };
    counter: {
        [key: string]: any;
    };
    constructor();
    addAsk(a: {
        [key: string]: any;
    }): number;
    addBid(a: {
        [key: string]: any;
    }): number;
    countAsks(): number;
    countBids(): number;
    getHighestBuyPrice(): number;
    getLowestSellPrice(): number;
    getSpreadAmount(): number;
    getSpreadPercent(): number;
    listBuyOffers(): {
        [key: string]: any;
    }[];
    listSellOffers(): {
        [key: string]: any;
    }[];
    setAsks(a: {
        [key: string]: any;
    }[]): number;
    setBids(a: {
        [key: string]: any;
    }[]): number;
    compareAsks(a: {
        [key: string]: any;
    }, b: {
        [key: string]: any;
    }): number;
    compareBids(a: {
        [key: string]: any;
    }, b: {
        [key: string]: any;
    }): number;
    sortAsks(): void;
    sortBids(): void;
}
//# sourceMappingURL=book.d.ts.map