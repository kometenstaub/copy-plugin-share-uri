import { App, FuzzyMatch, FuzzySuggestModal, Platform } from 'obsidian';
import type { PluginEntry } from './interfaces';
import type SharePluginUri from './main';
import { copyShareUri, returnPluginJson } from './utils';

export class SearchModal extends FuzzySuggestModal<PluginEntry> {
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
		//@ts-expect-error, it's not in the type defs
		await super.updateSuggestions()
	}

	focusInput() {
		//@ts-ignore
		document.getElementsByClassName('prompt-input')[0].focus();
	}

	getItems(): PluginEntry[] {
		return this.suggestions;
	}

	getItemText(item: PluginEntry): string {
		return item.name + ': ' + item.description + ' (' + item.author + ')';
	}

	onChooseItem(item: PluginEntry, evt: MouseEvent | KeyboardEvent): void {
		copyShareUri(item.id);
	}

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
