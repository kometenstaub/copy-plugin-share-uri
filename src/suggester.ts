import { App, FuzzyMatch, FuzzySuggestModal, Platform } from 'obsidian';
import type { PluginEntry } from './interfaces';
import type SharePluginUri from './main';
import { copyShareUri, returnPluginJson } from './utils';

export class SearchModal extends FuzzySuggestModal<Promise<PluginEntry[]>> {
	plugin: SharePluginUri;
	suggestions!: PluginEntry[];

	constructor(app: App, plugin: SharePluginUri) {
		super(app);
		this.plugin = plugin;
		this.setPlaceholder('Please start typing...');
		this.setInstructions([
			{
				command: '↵',
				purpose: 'to copy to the clipboard',
			},
		]);
	}

	async onOpen() {
		if (Platform.isDesktopApp) {
			this.focusInput();
		} else if (Platform.isMobileApp) {
			setTimeout(this.focusInput, 400);
		}
		this.suggestions = await returnPluginJson();
		// pre-populate suggestions without typing
		await this.updateSuggestions()
	}

	focusInput() {
		//@ts-ignore
		document.getElementsByClassName('prompt-input')[0].focus();
	}

	// necessary because we are getting the suggestions asynchronously
	async updateSuggestions() {
		//@ts-expect-error
		await super.updateSuggestions();
		// normally set it to null if we're getting new suggestions, but this time they stay the same
		// because we're not fetching new data on every keystroke
		//this.suggestions = null;
	}

	//@ts-ignore
	getItems(): PluginEntry[] {
		return this.suggestions;
	}
	//@ts-ignore
	getItemText(item: PluginEntry): string {
		return item.name + ': ' + item.description + ' (' + item.author + ')';
	}
	//@ts-ignore
	onChooseItem(item: PluginEntry, evt: MouseEvent | KeyboardEvent): void {
		copyShareUri(item.id);
	}
	//@ts-ignore
	renderSuggestion(item: FuzzyMatch<PluginEntry>, el: HTMLElement): void {
		const { name, description, author } = item.item;
		const container = el.createDiv();
		container.createEl('b', {
			cls: 'plugin-share-uri-name',
			text: name,
		});
		container.createDiv({
			cls: 'plugin-share-uri-author',
			text: ' (' + author + ')',
		});
		container.createDiv({
			cls: 'plugin-share-uri-description',
			text: description,
		});
	}
}
