import { App, Plugin } from 'obsidian';
import { SearchModal } from './suggester';

export default class SharePluginUri extends Plugin {
	async onload() {
		console.log('loading SharePluginUri plugin');

		this.addCommand({
			id: 'copy-plugin-share-uri',
			name: 'Copy Share URI',
			callback: () => {
				const copyLink = new SearchModal(this.app, this).open();
				return copyLink;
			},
		});
	}

	onunload() {
		console.log('unloading SharePluginUri plugin');
	}
}
