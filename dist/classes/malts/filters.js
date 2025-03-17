import Malt from "../malt";
export default class FiltersMalt extends Malt {
    columnlist = [];
    currentrow = 0;
    finalstep = 0;
    firststep = 1;
    laststep = 0;
    maxrows = 13;
    nextstep = 0;
    page = 1;
    pages = 1;
    offset = 1;
    recordcount = 0;
    sortcol = '';
    sortdir = 'asc';
    newdir = 'desc';
    keywords = '';
    startrow = 1;
    totalpages = 1;
    totalrows = 0;
    tab = 1;
    constructor() { super({}); }
    calculateDefaults() {
        if (this.offset < 1) {
            this.offset = 1;
        }
        if (this.sortdir == 'asc') {
            this.newdir = 'desc';
        }
        else {
            this.newdir = 'asc';
        }
    }
    calculatePaging() {
        if (this.recordcount == 0) {
            this.pages = 1;
            this.page = 1;
            this.endrow = 1;
            this.offset = 1;
            this.finalstep = 1;
            this.nextstep = 1;
            this.laststep = 1;
            this.startrow = 1;
        }
        else if (this.maxrows == '*') {
            this.pages = 1;
            this.page = 1;
            this.endrow = this.recordcount;
            this.offset = 1;
            this.finalstep = 1;
            this.nextstep = 1;
            this.laststep = 1;
            this.startrow = 1;
        }
        else {
            this.pages = Math.ceil(this.recordcount / Number(this.maxrows));
            this.page = Math.ceil(this.offset / Number(this.maxrows));
            this.endrow = (this.offset + Number(this.maxrows)) - 1;
            if (this.endrow <= 0) {
                this.endrow = 1;
            }
            if (this.recordcount < this.endrow) {
                this.endrow = this.recordcount;
                this.finalstep = (this.endrow - Number(this.maxrows)) + 1;
                this.nextstep = (this.endrow - Number(this.maxrows)) + 1;
            }
            else {
                this.finalstep = this.recordcount - (Number(this.maxrows) - ((this.pages * Number(this.maxrows)) - this.recordcount));
                this.nextstep = this.endrow + 1;
            }
            if (this.recordcount < (this.nextstep + Number(this.maxrows))) {
                this.nextstep = this.finalstep;
            }
            if (this.endrow >= this.recordcount && this.page < this.pages) {
                this.page = this.pages;
            }
        }
        if (this.laststep <= 0) {
            this.laststep = 1;
        }
        if (this.nextstep <= 0) {
            this.nextstep = 1;
        }
        this.firststep = 1;
    }
    getFilterArray(formId) {
        let r = this.getReservedColumns();
        let a = '[\'#' + formId + '_keywords\'';
        let b = this.keysArray();
        for (let i = 0; i < b.length; i++) {
            let k = b[i];
            if (this.arrayContains(r, k)) {
                a += ',\'#' + formId + '_' + k + '\'';
            }
        }
        a += ']';
        return a;
    }
    getNewSortDirection(columnName) { let d = 'asc'; if (this.sortcol == columnName && this.sortdir == 'asc') {
        d = 'desc';
    } return d; }
    getReservedColumns() { return ['formId', 'columnlist', 'currentrow', 'finalstep', 'firststep', 'laststep', 'maxrows', 'nextstep', 'page', 'pages', 'offset', 'recordcount', 'sortcol', 'sortdir', 'newdir', 'keywords', 'sql', 'startrow', 'totalpages', 'totalrows']; }
    setColumnlist(l) { this.columnlist = l; }
}
//# sourceMappingURL=filters.js.map