"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testRunner = require("vscode/lib/testrunner");
testRunner.configure({
    timeout: 10000,
    ui: "tdd",
    useColors: true,
});
module.exports = testRunner;
//# sourceMappingURL=index.js.map