import * as firebase from 'firebase/app';
import 'firebase/auth';
import UserCredential = firebase.auth.UserCredential;
import {User} from "firebase";

describe('testing firebase authentication', () => {
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
    it('should create a new user', async () => {
        const newUser: UserCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        console.log(`New user: ${newUser.user} with credentials ${newUser.credential}`);
        expect(newUser).toBeTruthy();
    });
    it('should sign in the existing user', async () => {
        const existingUser: UserCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        console.log(`Sign in existing user ${existingUser.user} with credentials ${existingUser.credential}`);
        expect(existingUser).toBeTruthy();
    });
    it('should run the observer when authentication state changes', async () => {
        const user: User | null = firebase.auth().currentUser;
        expect(user).toBeTruthy();
        console.log(`Current user ${user}`);

        if (user) firebase.auth().onAuthStateChanged((firebaseUser: any) => {
            console.log(firebaseUser);
            expect(firebaseUser).toBeDefined();
        });
    });
});