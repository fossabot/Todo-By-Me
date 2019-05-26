import * as firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';

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

    //Initialize the Firebase SDK when instantiating the class
    constructor() {firebase.initializeApp(this.firebaseConfig)}
}