import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyDGD9gItOVTFh84yZk7zldikkucCORkBv8",
    authDomain: "prueba-001-001.firebaseapp.com",
    databaseURL: "https://prueba-001-001.firebaseio.com",
    projectId: "prueba-001-001",
    storageBucket: "prueba-001-001.appspot.com",
    messagingSenderId: "516785942358",
    appId: "1:516785942358:web:41675621097c99fc2bf0f7",
    measurementId: "G-48KF4FVP2Y"
};

const fb = firebase.initializeApp(config);
const db = firebase.firestore();
const fs = firebase.storage();

export {fb, db, fs}