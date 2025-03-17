import Malt from '../malt';
import { RouteMaltInterface } from '../../interfaces/malts/route';
export default class RouteMalt extends Malt implements RouteMaltInterface {
    id: string;
    title: string;
    format: string;
    section: string;
    handler: string;
    level: number;
    constructor(id: string, title: string, format: string, level: number);
}
//# sourceMappingURL=route.d.ts.map