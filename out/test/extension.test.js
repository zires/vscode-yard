"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const fs_1 = require("fs");
const path = require("path");
const vscode_1 = require("vscode");
const extensionID = "pavlitsky.yard";
const extensionPath = vscode_1.extensions.getExtension(extensionID).extensionPath;
const projectPath = path.join(extensionPath, "src", "test", "project");
const workspacePath = path.join(extensionPath, "out", "test");
// Update extension configuration with specified options
function updateConfig(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const config = vscode_1.workspace.getConfiguration("yard");
        for (const key of Object.keys(options.spacers)) {
            yield config.update("spacers." + key, options.spacers[key]);
        }
        for (const key of Object.keys(options.tags)) {
            yield config.update("tags." + key, options.tags[key]);
        }
    });
}
// Assert that processed file contains the same result as expected file
function expectFileDocumented(fileName) {
    return __awaiter(this, void 0, void 0, function* () {
        const textDocument = yield vscode_1.workspace.openTextDocument(path.join(projectPath, fileName + ".rb"));
        const editor = yield vscode_1.window.showTextDocument(textDocument);
        yield vscode_1.commands.executeCommand("extension.generateYard");
        const generatedText = editor.document.getText();
        yield vscode_1.commands.executeCommand("workbench.action.closeActiveEditor");
        const expectedText = fs_1.readFileSync(path.join(projectPath, fileName + "_expected.rb"), "utf8");
        return assert.equal(generatedText, expectedText);
    });
}
function expectDocumented(testCases) {
    return __awaiter(this, void 0, void 0, function* () {
        testCases.forEach((testCase) => __awaiter(this, void 0, void 0, function* () {
            yield test(`document ${testCase}`, () => __awaiter(this, void 0, void 0, function* () { return yield expectFileDocumented(testCase); }));
        }));
    });
}
suite("Default Documenter Tests", () => {
    const configOptions = {
        spacers: {
            afterDescription: true,
            afterSingleTag: false,
            afterTags: true,
            beforeDescription: true,
            beforeSingleTag: false,
            beforeTags: true,
            separateTags: true,
        },
        tags: {
            author: true,
            paramNameBeforeType: false,
        },
    };
    const testCases = [
        "non_commentable",
        "existing_comment",
        "method/identation",
        "method/spaced_params",
        "method/instance_single_param",
        "method/instance_two_params",
        "method/default_params",
        "method/splat_params",
        "method/options_hash_param",
        "method/block_param",
        "method/empty_params",
        "method/single_line",
        "method/single_line_parentheses",
        "method/initializer",
        "method/class_single_param",
        "method/without_parentheses",
        "method/naming/setter",
        "method/naming/bang",
        "method/naming/boolean",
        "method/naming/operator",
        "method/naming/element",
        "method/naming/element_assignment",
        "method/naming/unary",
        "method/naming/japanese_hello",
        "method/naming/leet",
        "class_or_module/class",
        "class_or_module/module",
        "class_or_module/namespaced",
        "class_or_module/namespaced_and_nested",
        "constant/constant",
        "constant/constant_spaced",
        "attribute/reader",
        "attribute/writer",
        "attribute/accessor",
        "attribute/class_accessor",
        "attribute/class_attribute",
    ];
    suiteSetup(() => __awaiter(void 0, void 0, void 0, function* () { yield updateConfig(configOptions); }));
    expectDocumented(testCases);
});
suite("Verbose Documenter Tests", () => {
    const configOptions = {
        spacers: {
            afterDescription: true,
            afterSingleTag: true,
            afterTags: true,
            beforeDescription: true,
            beforeSingleTag: true,
            beforeTags: true,
            separateTags: true,
        },
        tags: {
            author: true,
            paramNameBeforeType: false,
        },
    };
    const testCases = [
        "verbose/class",
        "verbose/instance_two_params",
        "verbose/options_hash_param",
        "verbose/constant",
        "verbose/attribute",
    ];
    suiteSetup(() => __awaiter(void 0, void 0, void 0, function* () { yield updateConfig(configOptions); }));
    expectDocumented(testCases);
});
suite("Curt Documenter Tests", () => {
    const configOptions = {
        spacers: {
            afterDescription: false,
            afterSingleTag: false,
            afterTags: false,
            beforeDescription: false,
            beforeSingleTag: false,
            beforeTags: false,
            separateTags: false,
        },
        tags: {
            author: false,
            paramNameBeforeType: false,
        },
    };
    const testCases = [
        "curt/class",
        "curt/instance_two_params",
        "curt/options_hash_param",
        "curt/constant",
        "curt/attribute",
    ];
    suiteSetup(() => __awaiter(void 0, void 0, void 0, function* () { yield updateConfig(configOptions); }));
    expectDocumented(testCases);
});
suite("Special options", () => {
    const configOptions = {
        spacers: {
            afterDescription: true,
            afterSingleTag: false,
            afterTags: true,
            beforeDescription: true,
            beforeSingleTag: false,
            beforeTags: true,
            separateTags: true,
        },
        tags: {
            author: true,
            paramNameBeforeType: true,
        },
    };
    const testCases = [
        "special/param_name_before_types"
    ];
    suiteSetup(() => __awaiter(void 0, void 0, void 0, function* () { yield updateConfig(configOptions); }));
    expectDocumented(testCases);
});
suite("Extension Tests", () => {
    test("should be present", () => {
        assert.ok(vscode_1.extensions.getExtension(extensionID));
    });
});
//# sourceMappingURL=extension.test.js.map