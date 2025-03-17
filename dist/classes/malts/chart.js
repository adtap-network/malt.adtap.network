import Malt from "../malt";
export default class ChartMalt extends Malt {
    script = '';
    canvas = '';
    context = '2d';
    type = 'line';
    period = 'day';
    label = this.day() + ' ' + this.monthAsString() + ' ' + this.year();
    data = { volume: 0, open: 0, close: 0, labels: '', datasets: [], records: [] };
    constructor() { super({}); }
    menuDay() {
        let b = [];
        let h = 0;
        let t = '';
        for (let i = 0; i < 24; i++) {
            if (i > 12) {
                t = 'PM';
                h = i - 12;
            }
            else {
                h = i;
                t = 'AM';
            }
            b.push(h.toString() + ' ' + t);
        }
        return b;
    }
    menuHour() {
        let b = [];
        for (let j = 0; j < 24; j++) {
            let v = this.zeroPad(j.toString(), 2);
            b.push(v);
        }
        return b;
    }
    menuMonth() { return []; }
    menuQuarter() { return []; }
    menuWeek() { return ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']; }
    menuYear() { return ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']; }
    setAnalytics(a) { this.analytics = a; }
    setCanvas(id) { this.canvas = id; }
    setContext(d) { this.context = d; }
    setScript(s) { this.script = s; }
    setType(t) { this.type = t; }
}
//# sourceMappingURL=chart.js.map