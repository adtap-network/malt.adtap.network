import Malt from "../malt";
import { QueryMaltInterface } from '../../interfaces/malts/query';
import { FiltersMaltInterface } from '../../interfaces/malts/filters';
export default class QueryMalt extends Malt implements QueryMaltInterface {
    row: {
        [key: string]: any;
    };
    rows: {
        [key: string]: any;
    }[];
    recordcount: number;
    filters: FiltersMaltInterface;
    sql: string;
    menus: {
        [key: string]: any;
    };
    columns: {
        [key: string]: any;
    }[];
    constructor();
    calculateRecordcount(): void;
    setSail(s: {
        [key: string]: any;
    }): void;
    setRows(a: {
        [key: string]: any;
    }[]): void;
}
//# sourceMappingURL=query.d.ts.map