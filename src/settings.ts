import { App, PluginSettingTab, Setting } from 'obsidian';
import type SharePluginUri from './main';

export default class SharePluginUriSettingTab extends PluginSettingTab {
    plugin: SharePluginUri;

    constructor(app: App, plugin: SharePluginUri) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;
        const { settings } = this.plugin;

        containerEl.empty();

        containerEl.createEl('h2', {
            text: ' ... Settings',
        });

        // // keys for YAML
        // new Setting(containerEl)
        //     .setName('')
        //     .setDesc('')
        //     .addText((text) => {
        //         text.setPlaceholder('')
        //             .setValue(settings.homeNote)
        //             .onChange(async (value) => {
        //                 settings.homeNote = value.trim()
        //                 await this.plugin.saveSettings();
        //             });
        //     });
    }
}
