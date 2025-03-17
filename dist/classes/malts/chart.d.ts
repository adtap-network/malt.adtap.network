import Malt from "../malt";
import AnalyticsMalt from './analytics';
export default class ChartMalt extends Malt {
    script: string;
    canvas: string;
    context: string;
    type: string;
    period: string;
    label: string;
    data: {
        [key: string]: any;
    };
    constructor();
    menuDay(): string[];
    menuHour(): string[];
    menuMonth(): never[];
    menuQuarter(): never[];
    menuWeek(): string[];
    menuYear(): string[];
    setAnalytics(a: typeof AnalyticsMalt): void;
    setCanvas(id: string): void;
    setContext(d: string): void;
    setScript(s: string): void;
    setType(t: string): void;
}
//# sourceMappingURL=chart.d.ts.map