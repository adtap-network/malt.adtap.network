import Malt from '../malt';
import SectionInterface from '../../interfaces/malts/section';

export default class SectionMalt extends Malt implements SectionInterface {

    id: string;
    parent: string;
    title: string;
    icon: string;
    primary: string;
    foreign: string;

    constructor(id: string, parent: string = '', title: string, icon: string = '', primary: string, foreign: string = '') {
        super({});
        this.id = id;
        this.parent = parent;
        this.title = title;
        this.icon = icon;
        this.primary = primary;
        this.foreign = foreign;
    }

}