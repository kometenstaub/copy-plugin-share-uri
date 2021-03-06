import { Notice, request, RequestParam } from 'obsidian';
import type { PluginEntry } from './interfaces';

export async function returnPluginJson(): Promise<PluginEntry[]> {
    const requestObj: RequestParam = {
        url: 'https://raw.githubusercontent.com/obsidianmd/obsidian-releases/master/community-plugins.json',
    };

    const json = await request(requestObj);
    const jsonArray: PluginEntry[] = JSON.parse(json);
    return jsonArray;
}

export async function copyShareUri(id: string): Promise<void> {
	let uri = `obsidian://show-plugin?id=${id}`
	uri = encodeURI(uri)
	await navigator.clipboard.writeText(`<${uri}>`)
	new Notice('Copied the share link to the clipboard')
}