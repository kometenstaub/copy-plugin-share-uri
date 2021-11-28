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
	}

	async updateSuggestions() {
		this.suggestions = await returnPluginJson();
		//@ts-expect-error
		await super.updateSuggestions();
		//@ts-expect-error
		this.suggestions = null;
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
		const nameEl = container.createEl('b', {
			cls: 'plugin-share-uri-name',
			text: name,
		});
		const authorEl = container.createDiv({
			cls: 'plugin-share-uri-author',
			text: ' (' + author + ')',
		});
		const descriptionEl = container.createDiv({
			cls: 'plugin-share-uri-description',
			text: description,
		});
	}
}
