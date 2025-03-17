import { MaltInterface } from '../malt';
export interface FiltersMaltInterface extends MaltInterface {
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
}
//# sourceMappingURL=filters.d.ts.map