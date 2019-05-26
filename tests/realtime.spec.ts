import * as firebase from "firebase/app";
import 'firebase/database';
import {User} from "firebase";
import Database = firebase.database.Database;
import {Todo} from "../src/models/todo";
import Reference = firebase.database.Reference;

describe('testing realtime database', async () => {
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
    await firebase.auth().signInWithEmailAndPassword(email, password);
    const user: User | null = firebase.auth().currentUser;
    const database: Database = firebase.database();
    it('should write a simple todo', async () => {
        if (user !== null) {
            const databaseReference: Reference = database.ref(`${user.uid}/todos`);
            const todo: Todo = {
                id: databaseReference.push().toString(),
                title: 'Sample TODO',
                contents: 'Just checking if it works or not'
            };
            expect(await databaseReference.set(todo)).toBeTruthy();
        }
    });
});