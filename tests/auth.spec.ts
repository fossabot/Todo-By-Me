import * as firebase from 'firebase/app';
import 'firebase/auth';
import UserCredential = firebase.auth.UserCredential;

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
        console.log(`New user: ${newUser}`);
        expect(newUser).toBeTruthy();
    });
});