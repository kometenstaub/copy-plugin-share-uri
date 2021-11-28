import {App, FuzzySuggestModal, Platform } from "obsidian";
import type { PluginEntry } from "./interfaces";
import type SharePluginUriPlugin from "./main";
import { copyShareUri, returnPluginJson } from "./utils";

export class SearchModal extends FuzzySuggestModal<Promise<any[]>> {
	plugin: SharePluginUriPlugin;
	suggestions!: PluginEntry[];

	constructor(app: App, plugin: SharePluginUriPlugin) {
		super(app);
		this.plugin = plugin
		this.setPlaceholder('Please start typing...');
		this.setInstructions([{
			command: '↵',
			purpose: 'to copy to the clipboard'
		}])
	}

	onOpen() {
		if (Platform.isDesktopApp) {
			this.focusInput();
		} else if (Platform.isMobileApp) {
			setTimeout(this.focusInput, 400);
		}
	}

	focusInput() {
		//@ts-ignore
		document.getElementsByClassName('prompt-input')[0].focus();
		//@ts-ignore
		document.getElementsByClassName('prompt-input')[0].select();
	}

	async updateSuggestions() {
		const { value } = this.inputEl;
		this.suggestions = await returnPluginJson()
		//@ts-expect-error
		await super.updateSuggestions()
		//@ts-expect-error
		this.suggestions = null;
	}


	//@ts-ignore
	getItems(): PluginEntry[] {
		return this.suggestions
	}
	//@ts-ignore
	getItemText(item: PluginEntry): string {
		return item.name + ': ' + item.description
	}
	//@ts-ignore
	onChooseItem(item: PluginEntry, evt: MouseEvent | KeyboardEvent): void {
		copyShareUri(item.id)
	}
	
}