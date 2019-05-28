import * as firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
import {User} from "firebase";
import Database = firebase.database.Database;
import {Todo} from "../src/models/todo";
import Reference = firebase.database.Reference;

describe('testing realtime database', () => {
    const email: string = 'test@gmail.com';
    const password: string = 'test-password';
    const firebaseConfig = {
        apiKey: "AIzaSyAZIeDk_xkrXYxjhkjeU2NzHXMsVCXe0Q4",
        authDomain: "multiplatform-todo.firebaseapp.com",
        databaseURL: "https://multiplatform-todo.firebaseio.com",
        projectId: "multiplatform-todo",
        storageBucket: "multiplatform-todo.appspot.com",
        messagingSenderId: "531453185631",
        appId: "1:531453185631:web:697c858552cf770d"
    };
    firebase.initializeApp(firebaseConfig);
    it('should write a simple todo', async () => {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        const user: User | null = firebase.auth().currentUser;
        const database: Database = firebase.database();
        if (user !== null) {
            const databaseReference: Reference = database.ref(`${user.uid}/todos`);
            const todoId = databaseReference.push().key as string;
            const todo: Todo = {
                id: todoId,
                title: 'Sample TODO',
                contents: 'Just checking if it works or not'
            };
            expect(await databaseReference.child(todoId).set(todo)).toBeFalsy();
        } else expect(user).toBeFalsy();
    });
    it('should fetch all todos', async () => {
        const user: User | null = firebase.auth().currentUser;
        const database: Database = firebase.database();
        if (user !== null) {
            const databaseReference: Reference = database.ref(`${user.uid}/todos`);
            await databaseReference.orderByKey().on('child_added', (snap) => {
                expect(snap).toBeDefined();
                snap.forEach((result: any) => {
                    expect(result.val()).toBeDefined();
                })
            });
        }
    });
    it('should modify a todo', async () => {
        const user: User | null = firebase.auth().currentUser;
        const database: Database = firebase.database();
        if (user !== null) {
            const databaseReference: Reference = database.ref(`${user.uid}/todos`);
            const todoId = databaseReference.push().key as string;
            const todo: Todo = {
                id: todoId,
                title: 'Sample TODO, but this one will be modified',
                contents: 'Just checking if it works or not'
            };
            const todoNew: Todo = {
                id: todoId,
                title: 'Sample TODO, but this one will be modified',
                contents: 'So we should go from a generic entry to the updated one ;)'
            };
            await databaseReference.child(todoId).set(todo);
            expect(await databaseReference.child(todoId).update(todoNew)).toBeCalled();
        }
    });
});