import Malt from '../malt';
import { SectionMaltInterface } from '../../interfaces/malts/section';
export default class SectionMalt extends Malt implements SectionMaltInterface {
    id: string;
    parent: string;
    title: string;
    icon: string;
    primary: string;
    foreign: string;
    constructor(id: string, parent: string | undefined, title: string, icon: string | undefined, primary: string, foreign?: string);
}
//# sourceMappingURL=section.d.ts.map