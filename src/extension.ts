// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { hasFile, readFile } from './utils';

interface IFolder {
	name: string
	path: string
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
	const folders: IFolder[] = [];
	vscode.workspace.workspaceFolders?.forEach((folder: any) => {
		folders.push({
			name: folder.name,
			path: folder.uri.path,
		});
	});

	if (!folders.length) {
		return;
	}


	const packageJsonPath = `${folders[0].path}/package.json`;

	const hasPackageJson = await hasFile(packageJsonPath);
	if (!hasPackageJson) {
		return;
	}

	const packageValues = readFile(packageJsonPath);

	if (!packageValues || !packageValues.nvc) {
		return;
	}

	const nvc = packageValues.nvc;
	const nodeVersion = nvc.node;
	if (!nodeVersion) {
		return;
	}

	vscode.window.showInformationMessage(`该项目所需 node 版本：${nodeVersion}`);
	const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
	statusBarItem.text = `node 版本: ${nodeVersion}`;
	statusBarItem.show();
}

// this method is called when your extension is deactivated
export function deactivate() { }
