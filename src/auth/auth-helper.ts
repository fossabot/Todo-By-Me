import * as firebase from 'firebase/app';
import 'firebase/auth';
import UserCredential = firebase.auth.UserCredential;
import {User} from "firebase";

export class AuthHelper {
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
    constructor() {
        firebase.initializeApp(this.firebaseConfig);
    }

    /**
     * Create user with email and password. This async method will also validate the email format and password length.
     *
     * @param email string
     * @param password string
     * @return either Promise<UserCredential> or null if user creation fails
     */
    static async createUserWithEmailAndPassword(email: string, password: string): Promise<UserCredential | null> {
        return AuthHelper.emailValidation(email) && AuthHelper.passwordValidation(password) ?
            await firebase.auth().createUserWithEmailAndPassword(email, password) : null;
    }

    /**
     * Sign the user in with email and password.
     *
     * @param email string
     * @param password string
     * @return either Promise<UserCredential> or Promise<null> depending on whether signing in process was successful
     *          or not.
     */
    static async signUserWithEmailAndPassword(email: string, password: string): Promise<UserCredential | null> {
        const authenticationResult: UserCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        return authenticationResult !== null ? authenticationResult : null;
    }

    /**
     * Delete the user
     *
     * @param user object acquired with firebase.auth().currentUser
     */
    static async deleteUser(user: User) {
        user !== null ?
            await user.delete() :
            console.log('Error deleting an user. Is user signed in or has it been created in the first place?');
    }

    /**
     * Validate email form and return either true if form passes the test or false if it doesn't
     *
     * @param email string
     */
    private static emailValidation(email: string): boolean {
        return (/^[\w-.]+@[\w-.]+/gm as RegExp).test(email);
    }

    /**
     * Validate password FOR LENGTH ONLY, this method will need to be improved in the future
     *
     * @param password string
     */
    private static passwordValidation(password: string): boolean {
        return (/(?=.{8})/gm as RegExp).test(password);
    }
}