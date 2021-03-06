import * as firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
import {Todo} from "../models/todo";
import {Tag} from "../models/tag";
import {User} from "firebase";
import Database = firebase.database.Database;
import Reference = firebase.database.Reference;
import DataSnapshot = firebase.database.DataSnapshot;

export class RealtimeDbHelper {
    //Configuration details
    firebaseConfig = {
        apiKey: "AIzaSyAZIeDk_xkrXYxjhkjeU2NzHXMsVCXe0Q4",
        authDomain: "multiplatform-todo.firebaseapp.com",
        databaseURL: "https://multiplatform-todo.firebaseio.com",
        projectId: "multiplatform-todo",
        storageBucket: "multiplatform-todo.appspot.com",
        messagingSenderId: "531453185631",
        appId: "1:531453185631:web:697c858552cf770d"
    };

    //This user object represents signed in user
    public user: User;

    //Get Firebase database
    private firebaseDatabase: Database = firebase.database();

    //Initialize the Firebase SDK + get user data when instantiating the class
    constructor() {
        firebase.initializeApp(this.firebaseConfig);
        this.user = firebase.auth().currentUser as User;
    }

    /**
     * Create new td object. This method assumes that td includes valid data, mostly with respect to tag IDs.
     *
     * @param td object, check {@link Todo}
     */
    public async createTodo(td: Todo) {
        const databaseReference: Reference = this.firebaseDatabase.ref(`${this.user.uid}/todos`);
        const todoId = databaseReference.push().key as string;
        await databaseReference.child(todoId).set(td);
    }

    /**
     * This method will fetch a single td by ID
     * @param id
     */
    public async fetchTodo(id: string): Promise<Todo> {
        const databaseReference: Reference = this.firebaseDatabase.ref(`${this.user.uid}/todos/${id}`);
        const snapshot: DataSnapshot = await databaseReference.once('value');
        return snapshot.val();
    }

    /**
     * Fetch all td's and place them in a list. Currently, the data structure for storing td's is an interface, but that
     * ought to be changed in the future because it is not optimal.
     *
     * @return either list of td's or undefined if error occurred
     */
    public async fetchAllTodos(): Promise<Array<Todo> | undefined> {
        let todoList: Array<Todo> = [];
        const databaseReference: Reference = this.firebaseDatabase.ref(`${this.user.uid}/todos`);
        await databaseReference.orderByKey().on('child_added', (snap: any) => {
            let tempTodo: Todo = {
                id: snap.val().id,
                title: snap.val().title,
                contents: snap.val().contents,
                tags: snap.val().tags
            };
            todoList.push(tempTodo);
        });
        return todoList.length > 0 ? todoList : undefined;
    }

    /**
     * Update td entry by providing an ID and the new updated value
     * @param id
     * @param td
     */
    public async updateTodo(id: string, td: Todo) {
        const databaseReference: Reference = this.firebaseDatabase.ref(`${this.user.uid}/todos/${id}`);
        await databaseReference.update(td);
    }

    /**
     * Delete a td from an id
     * @param id
     */
    public async deleteTodo(id: string) {
        const databaseReference: Reference = this.firebaseDatabase.ref(`${this.user.uid}/todos/${id}`);
        await databaseReference.remove()
    }

    /**
     * Create tag under uid/tags reference
     *
     * @param tag object, see {@link Tag}
     */
    public async createTag(tag: Tag) {
        const databaseReference: Reference = this.firebaseDatabase.ref(`${this.user.uid}/tags`);
        const tagId = databaseReference.push().key as string;
        await databaseReference.child(tagId).set(tag);
    }
}