//prettier-ignore
export interface PluginEntry {
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