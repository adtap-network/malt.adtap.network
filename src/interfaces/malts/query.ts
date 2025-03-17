import FiltersMaltInterface from './filters';

export default interface QueryMaltInterface {

    row: {[key: string]: any};
    rows: {[key: string]: any}[];
    recordcount: number;
    filters: FiltersMaltInterface;
    sql: string;
    menus: {[key: string]: any};
    columns: {[key: string]: any}[];

}