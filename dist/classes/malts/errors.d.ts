import Malt from "../malt";
import { ErrorsMaltInterface } from "../../interfaces/malts/errors";
import { FaultMaltInterface } from "../../interfaces/malts/fault";
export default class ErrorsMalt extends Malt implements ErrorsMaltInterface {
    admin: boolean;
    codes: {
        [key: string]: {
            [key: string]: string;
        };
    };
    counter: number;
    dump: boolean;
    errors: {}[];
    settings: {
        [key: string]: string;
    };
    constructor();
    addError(error: {}): void;
    clearErrors(): void;
    createError(code: string, file: string, func: string, msg: string): FaultMaltInterface;
    createLog(): void;
    decrementCounter(): void;
    getCurrentError(): {};
    getError(index: number): {};
    getErrorCount(): number;
    getErrors(): {}[];
    getSettings(): {
        [key: string]: string;
    };
    incrementCounter(): void;
    logException(e: Error, file: string, func: string, type?: string, dump?: boolean): void;
    nextError(): {};
    previousError(): {};
    resetCounter(): void;
    setSettings(settings: {
        [key: string]: string;
    }): void;
}
//# sourceMappingURL=errors.d.ts.map