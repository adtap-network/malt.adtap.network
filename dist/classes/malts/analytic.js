import Malt from "../malt";
export default class AnalyticMalt extends Malt {
    analytic_timestamp = '';
    analytic_trades = 0;
    analytic_basevol = 0;
    analytic_countervol = 0;
    analytic_avg = 0;
    analytic_high = 0;
    analytic_low = 0;
    analytic_open = 0;
    analytic_close = 0;
    constructor() { super({}); }
    get_buying_average_price() { return this.formatLumens(1 / this.analytic_avg); }
    get_buying_high_price() { return this.formatLumens(1 / this.analytic_high); }
    get_buying_low_price() { return this.formatLumens(1 / this.analytic_low); }
    get_buying_open_price() { return this.formatLumens(1 / this.analytic_open); }
    get_buying_close_price() { return this.formatLumens(1 / this.analytic_close); }
    get_selling_average_price() { return this.formatLumens(this.analytic_avg); }
    get_selling_high_price() { return this.formatLumens(this.analytic_high); }
    get_selling_low_price() { return this.formatLumens(this.analytic_low); }
    get_selling_open_price() { return this.formatLumens(this.analytic_open); }
    get_selling_close_price() { return this.formatLumens(this.analytic_close); }
}
//# sourceMappingURL=analytic.js.map