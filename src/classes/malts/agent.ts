import Malt from '../malt';
import AgentMaltInterface from '../../interfaces/malts/agent';

export default class AgentMalt extends Malt implements AgentMaltInterface {

    intervals: {[key: string]: number};

    constructor(intervals: {[key: string]: number}) {
        super({});
        this.intervals = intervals;
    }

}

