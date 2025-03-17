import Malt from "../malt";
export default class AnalyticsMalt extends Malt {
    periodType: string;
    periodStart: number;
    periodEnd: number;
    periodResolution: number;
    periodOffset: number;
    periodOrder: string;
    periodLimit: number;
    records: {}[];
    totalRecords: number;
    constructor();
    addRecord(r: {}): number;
    countRecords(): number;
    listRecords(): {}[];
    menuPeriods(): string[];
    setPeriod(p: string): void;
    setPeriodHour(): void;
    setPeriodDay(): void;
    setPeriodWeek(): void;
    setPeriodMonth(): void;
    setPeriodQuarter(): void;
    setPeriodYear(): void;
    setRecords(rs: {}[]): number;
}
//# sourceMappingURL=analytics.d.ts.map