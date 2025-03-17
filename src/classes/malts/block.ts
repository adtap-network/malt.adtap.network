import Malt from '../malt';
import { BlockMaltInterface } from '../../interfaces/malts/block';

export default class BlockMalt extends Malt implements BlockMaltInterface {

    name: string;
    title: string;

    constructor(name: string, title: string) {
        super({});
        this.name = name;
        this.title = title;
    } 

}

