export interface Todo {
    id: string | null;
    title: string;
    contents: string;
    tags?: string[]
}