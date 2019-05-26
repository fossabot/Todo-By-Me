import {Tag} from "./tag";

export interface Todo {
    id: string;
    title: string;
    contents: string;
    tags?: Tag[]
}