import Malt from "../malt";
export default class AnalyticsMalt extends Malt {
    periodType = 'day';
    periodStart = ((this.time() * 1000) - 86400000);
    periodEnd = (this.time() * 1000);
    periodResolution = 3600000;
    periodOffset = 0;
    periodOrder = 'asc';
    periodLimit = 12;
    records = [];
    totalRecords = 0;
    constructor() { super({}); }
    addRecord(r) { this.records.push(r); return this.countRecords(); }
    countRecords() { this.totalRecords = this.records.length; return this.totalRecords; }
    listRecords() { return this.records; }
    menuPeriods() { return ['hour', 'day', 'week', 'month', 'quarter', 'year']; }
    setPeriod(p) {
        if (p == 'hour') {
            this.setPeriodHour();
        }
        else if (p == 'day') {
            this.setPeriodDay();
        }
        else if (p == 'week') {
            this.setPeriodWeek();
        }
        else if (p == 'month') {
            this.setPeriodMonth();
        }
        else if (p == 'quarter') {
            this.setPeriodQuarter();
        }
        else if (p == 'year') {
            this.setPeriodYear();
        }
    }
    setPeriodHour() {
        this.period_type = 'hour';
        this.period_start = (this.time() * 1000) - 3600000;
        this.period_end = (this.time() * 1000);
        this.period_resolution = 300000;
        this.period_limit = 12;
    }
    setPeriodDay() {
        this.period_type = 'day';
        this.period_start = (this.time() * 1000) - 86400000;
        this.period_end = (this.time() * 1000);
        this.period_resolution = 3600000;
        this.period_limit = 24;
    }
    setPeriodWeek() {
        this.period_type = 'week';
        this.period_start = (this.time() * 1000) - 604800000;
        this.period_end = (this.time() * 1000);
        this.period_resolution = 86400000;
        this.period_limit = 7;
    }
    setPeriodMonth() {
        this.period_type = 'month';
        this.period_start = (this.time() * 1000) - 2620800000;
        this.period_end = (this.time() * 1000);
        this.period_resolution = 109200000;
    }
    setPeriodQuarter() {
        this.period_type = 'quarter';
        this.period_start = (this.time() * 1000) - 7862400000;
        this.period_end = (this.time() * 1000);
        this.period_resolution = 327600000;
    }
    setPeriodYear() {
        this.period_type = 'year';
        this.period_start = (this.time() * 1000) - 31449600000;
        this.period_end = (this.time() * 1000);
        this.period_resolution = 2620800000;
        this.period_limit = 12;
    }
    setRecords(rs) { this.records = rs; return this.countRecords(); }
}
//# sourceMappingURL=analytics.js.map