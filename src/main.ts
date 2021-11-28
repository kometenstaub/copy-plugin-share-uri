import { App, Plugin } from 'obsidian';
import type { SharePluginUriSettings } from './interfaces';
// import SharePluginUriSettingTab from './settings';

const DEFAULT_SETTINGS: SharePluginUriSettings = {};

export default class SharePluginUriPlugin extends Plugin {
    settings!: SharePluginUriSettings;

    async onload() {
        console.log('loading SharePluginUriPlugin plugin');

        // await this.loadSettings();

        // this.addSettingTab(new SharePluginUriSettingTab(this.app, this));
    }

    onunload() {
        console.log('unloading SharePluginUriPlugin plugin');
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
