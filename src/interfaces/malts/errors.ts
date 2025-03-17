import { MaltInterface } from '../malt';
import FaultMaltInterface from "./fault";

export interface ErrorsMaltInterface extends MaltInterface {

    admin: boolean;
    codes: {[key: string]: {[key: string]: string}};
    counter: number;
    dump: boolean;
    errors: {}[];
    settings: {[key: string]: string};

    addError(error: {}): void;

    clearErrors(): void;

    createError(code: string, file: string, func: string, msg: string): FaultMaltInterface;

    createLog(): void;

    decrementCounter() : void;

    getCurrentError(): {[key: string]: string};

    getError(index: number): {[key: string]: string};
    
    getErrorCount(): number;

    getErrors(): {}[];

    incrementCounter(): void;

    logException(e: Error, file: string, func: string, type: string, dump: boolean): void;

    nextError(): {[key: string]: string};

    previousError(): {[key: string]: string};

    resetCounter(): void;

    setSettings(settings: {[key: string]: string}): void;

}