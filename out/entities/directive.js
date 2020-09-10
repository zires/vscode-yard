"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Directive = void 0;
const tag_1 = require("./tag");
// Directive extends Tag with types specifier and entities list.
class Directive extends tag_1.Tag {
    constructor(params = {}) {
        super(params);
        const { tagTypes = "", entities = [], type = "Directive", } = params;
        this.tagTypes = tagTypes;
        this.entities = entities;
        this.type = type;
    }
}
exports.Directive = Directive;
//# sourceMappingURL=directive.js.map