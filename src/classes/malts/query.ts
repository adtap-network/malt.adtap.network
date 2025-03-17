import Malt from "../malt";
import { QueryMaltInterface } from '../../interfaces/malts/query';
import FiltersMalt from './filters';
import { FiltersMaltInterface } from '../../interfaces/malts/filters';

export default class QueryMalt extends Malt implements QueryMaltInterface {

  row: {[key: string]: any}				  = {};
  rows: {[key: string]: any}[]			= [];
  recordcount: number          			= 0;
  filters: FiltersMaltInterface		  = new FiltersMalt();
  sql: string 							        = '';
  menus: {[key: string]: any} 			= {};
  columns: {[key: string]: any}[]		= [];

  constructor() { super({}); }

  calculateRecordcount(): void { this.recordcount = this.rows.length; }

  setSail(s: {[key: string]: any}): void {
	  if(s.hasProperty('filters')) { this.filters.mergeProperties(s.filters); }
		if(s.hasProperty('rows')) { this.setRows(s.rows); }
	}

	setRows(a: {[key: string]: any}[]): void {
		this.rows = a;
		this.calculateRecordcount();
	}

}