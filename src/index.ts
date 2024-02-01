import vscode from "vscode";

const MAP: Record<string, string> = {
  true: "false",
  false: "true",
};

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "toggleBool.toggle",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) return;

      const { document } = editor;

      const wordRange = document.getWordRangeAtPosition(
        editor.selection.active,
      );
      if (!wordRange) return;

      const word = document.getText(wordRange);
      const replaceWord = MAP[word];
      if (!replaceWord) return;

      editor.edit((editBuilder) => {
        editBuilder.replace(wordRange, replaceWord);
      });
    },
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
