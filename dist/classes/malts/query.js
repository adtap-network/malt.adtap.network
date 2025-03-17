import Malt from "../malt";
import FiltersMalt from './filters';
export default class QueryMalt extends Malt {
    row = {};
    rows = [];
    recordcount = 0;
    filters = new FiltersMalt();
    sql = '';
    menus = {};
    columns = [];
    constructor() { super({}); }
    calculateRecordcount() { this.recordcount = this.rows.length; }
    setSail(s) {
        if (s.hasProperty('filters')) {
            this.filters.mergeProperties(s.filters);
        }
        if (s.hasProperty('rows')) {
            this.setRows(s.rows);
        }
    }
    setRows(a) {
        this.rows = a;
        this.calculateRecordcount();
    }
}
//# sourceMappingURL=query.js.map