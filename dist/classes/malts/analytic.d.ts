import Malt from "../malt";
export default class AnalyticMalt extends Malt {
    analytic_timestamp: string;
    analytic_trades: number;
    analytic_basevol: number;
    analytic_countervol: number;
    analytic_avg: number;
    analytic_high: number;
    analytic_low: number;
    analytic_open: number;
    analytic_close: number;
    constructor();
    get_buying_average_price(): number;
    get_buying_high_price(): number;
    get_buying_low_price(): number;
    get_buying_open_price(): number;
    get_buying_close_price(): number;
    get_selling_average_price(): number;
    get_selling_high_price(): number;
    get_selling_low_price(): number;
    get_selling_open_price(): number;
    get_selling_close_price(): number;
}
//# sourceMappingURL=analytic.d.ts.map