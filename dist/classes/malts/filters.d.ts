import Malt from "../malt";
export default class FiltersMalt extends Malt {
    columnlist: string[];
    currentrow: number;
    finalstep: number;
    firststep: number;
    laststep: number;
    maxrows: string | number;
    nextstep: number;
    page: number;
    pages: number;
    offset: number;
    recordcount: number;
    sortcol: string;
    sortdir: string;
    newdir: string;
    keywords: string;
    startrow: number;
    totalpages: number;
    totalrows: number;
    tab: number;
    constructor();
    calculateDefaults(): void;
    calculatePaging(): void;
    getFilterArray(formId: string): string;
    getNewSortDirection(columnName: string): string;
    getReservedColumns(): string[];
    setColumnlist(l: string[]): void;
}
//# sourceMappingURL=filters.d.ts.map