import Malt from '../malt';
import RouteMaltInterface from '../../interfaces/malts/route';

export default class RouteMalt extends Malt implements RouteMaltInterface {

    id: string;
    title: string; 
    format: string; 
    section: string; 
    handler: string; 
    level: number;

    constructor(id: string, title: string, format: string, level: number) {
        super({});
        this.id = id;
        this.title = title;
        this.format = format;
        this.level = level;     
        const a = this.id.split('_');
        this.handler = a[a.length-1];
        this.section = "";
        for(let i=0; i<a.length-1; i++) {
            if(i > 0) { this.section += "_"; }
            this.section += a[i];
        }
    }

}