import Malt from '../malt';
export default class RouteMalt extends Malt {
    id;
    title;
    format;
    section;
    handler;
    level;
    constructor(id, title, format, level) {
        super({});
        this.id = id;
        this.title = title;
        this.format = format;
        this.level = level;
        const a = this.id.split('_');
        this.handler = a[a.length - 1];
        this.section = "";
        for (let i = 0; i < a.length - 1; i++) {
            if (i > 0) {
                this.section += "_";
            }
            this.section += a[i];
        }
    }
}
//# sourceMappingURL=route.js.map