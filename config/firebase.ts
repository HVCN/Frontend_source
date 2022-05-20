import { initializeApp } from 'firebase/app';
import firebase from 'firebase/auth';
import 'firebase/auth';
import Constants from 'expo-constants';

//Initialize Firebase
const firebaseConfig = {
    apiKey: Constants.manifest?.extra?.apiKey,
    authDomain: Constants.manifest?.extra?.authDomain,
    projectId: Constants.manifest?.extra?.projectId,
    storageBucket: Constants.manifest?.extra?.storageBucket,
    messagingSenderId: Constants.manifest?.extra?.messagingSenderId,
    appId: Constants.manifest?.extra?.appId
};

let app = initializeApp(firebaseConfig);

/*
let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
}
*/

export default app;
