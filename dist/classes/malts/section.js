import Malt from '../malt';
export default class SectionMalt extends Malt {
    id;
    parent;
    title;
    icon;
    primary;
    foreign;
    constructor(id, parent = '', title, icon = '', primary, foreign = '') {
        super({});
        this.id = id;
        this.parent = parent;
        this.title = title;
        this.icon = icon;
        this.primary = primary;
        this.foreign = foreign;
    }
}
//# sourceMappingURL=section.js.map