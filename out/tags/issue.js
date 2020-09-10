"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IssueTag = void 0;
const text_1 = require("../entities/text");
// Descriptive documentation issue tag
// alex/PG-1256
// [PG-1256] http://jira.rccchina.com/browse/PG-1256
class IssueTag extends text_1.Text {
    constructor(params = {}) {
        super(params);
        this.text = params.text || '';
        // this.text = "[PG-1256] http://jira.rccchina.com/browse/PG-1256";
        this.type = "Text";
    }
}
exports.IssueTag = IssueTag;
//# sourceMappingURL=issue.js.map