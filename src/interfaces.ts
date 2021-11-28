// export interface SharePluginUriSettings {
// }

//prettier-ignore
export interface PluginArray {
    id:          string;
    name:        string;
    author:      string;
    description: string;
    repo:        string;
    branch?:     Branch;
}

enum Branch {
    Main = "main",
}