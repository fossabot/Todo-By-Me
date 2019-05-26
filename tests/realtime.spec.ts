import * as firebase from "firebase/app";
import 'firebase/database';
import {User} from "firebase";
import Database = firebase.database.Database;

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
    it('should ', function () {

    });
});