import { App, Plugin } from 'obsidian';
// import type { SharePluginUriSettings } from './interfaces';
// import SharePluginUriSettingTab from './settings';
import { SearchModal } from './suggester';

// const DEFAULT_SETTINGS: SharePluginUriSettings = {};

export default class SharePluginUri extends Plugin {
    // settings!: SharePluginUriSettings;

    async onload() {
        console.log('loading SharePluginUri plugin');

        this.addCommand({
            id: 'copy-plugin-share-uri',
            name: 'Copy Share URI',
            callback: () => {
                const copyLink = new SearchModal(this.app, this).open()
                return copyLink

            }
        })
        // await this.loadSettings();

        // this.addSettingTab(new SharePluginUriSettingTab(this.app, this));
    }

    onunload() {
        console.log('unloading SharePluginUri plugin');

    }


    // async loadSettings() {
    //     this.settings = Object.assign(
    //         {},
    //         DEFAULT_SETTINGS,
    //         await this.loadData()
    //     );
    // }

    // async saveSettings() {
    //     await this.saveData(this.settings);
    // }
}
