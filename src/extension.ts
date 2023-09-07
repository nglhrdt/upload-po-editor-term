import axios from "axios";
import * as FormData from "form-data";
import * as vscode from "vscode";

interface IPoEditorTerm {
  term: string;
  context: string;
  translation?: {
    content: string;
  };
}

export function activate(context: vscode.ExtensionContext) {
  let uploadDialog = vscode.commands.registerCommand(
    "upload-po-editor-term.uploadTermFromSelection",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const selection = editor.selection;
        const selectedTranslationKey = editor.document.getText(selection);

        if (isValidTranslationKey(selectedTranslationKey)) {
          const config = getExtensionConfig();
          const apiToken = config["apiToken"];
          const projectId = config["projectId"];

          if (apiToken && projectId) {
            createTerm(selectedTranslationKey, apiToken, projectId);
          } else {
            vscode.window.showErrorMessage(
              "Please set the API token and project ID in the extension settings"
            );
          }
        }
      }
    }
  );

  context.subscriptions.push(uploadDialog);
}

export function deactivate() {}

export function isValidTranslationKey(selectedTranslationKey: string): boolean {
  if (!selectedTranslationKey) {
    return false;
  }

  const validTranslationKeyRegex = new RegExp(/^(pages|components|generic)\./);

  return validTranslationKeyRegex.test(selectedTranslationKey);
}

function createTerm(
  selectedTranslationKey: string,
  apiToken: string,
  projectId: string
): void {
  const context = getContext(selectedTranslationKey);
  const term = getTerm(selectedTranslationKey);

  const termData: IPoEditorTerm = {
    term,
    context,
  };

  const termFormData = new FormData();

  termFormData.append("api_token", apiToken);
  termFormData.append("id", projectId);
  termFormData.append("data", JSON.stringify([termData]));

  axios
    .post("https://api.poeditor.com/v2/terms/add", termFormData, {
      headers: {
        "Content-Type": "multipart/form-data", // Important: set the correct content type for form data
      },
    })
    .then(() => {
      vscode.window.showInformationMessage(`Term ${term} created successfully`);
    })
    .catch(() => {
      vscode.window.showErrorMessage(`Error creating term ${term}`);
    });
}

function getContext(selectedTranslationKey: string): string {
  return selectedTranslationKey
    .split(".")
    .slice(0, -1)
    .map((key) => `"${key}"`)
    .join(".");
}

function getTerm(selectedTranslationKey: string): string {
  return selectedTranslationKey.split(".").pop()!;
}

function getExtensionConfig(): vscode.WorkspaceConfiguration {
  return vscode.workspace.getConfiguration("upload-po-editor-term");
}
