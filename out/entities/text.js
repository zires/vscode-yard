"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = void 0;
// Single block of a descriptive text for a method or a class.
class Text {
    constructor(params = {}) {
        const { text = "", type = "Text", } = params;
        this.text = text;
        this.type = type;
    }
}
exports.Text = Text;
//# sourceMappingURL=text.js.map