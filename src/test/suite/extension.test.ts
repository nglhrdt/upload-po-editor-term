import * as assert from "assert";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";
import { isValidTranslationKey } from "../../extension";
// import * as myExtension from '../../extension';

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  test("isValidTranslationKey", () => {
    assert.strictEqual(isValidTranslationKey("pages.test"), true);
    assert.strictEqual(isValidTranslationKey("components.test"), true);
    assert.strictEqual(isValidTranslationKey("generic.test"), true);
    assert.strictEqual(isValidTranslationKey("generic"), false);
    assert.strictEqual(isValidTranslationKey(""), false);
    assert.strictEqual(isValidTranslationKey("pages"), false);
  });
});
