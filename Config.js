import firebase from 'firebase';
require('@firebase/firestore');

var firebaseConfig = {
    apiKey: "AIzaSyAkMbNjG1R4iGFzWNAPOqXNW5os0Yi7T2Q",
    authDomain: "barter-app-pika.firebaseapp.com",
    projectId: "barter-app-pika",
    storageBucket: "barter-app-pika.appspot.com",
    messagingSenderId: "391490482998",
    appId: "1:391490482998:web:8db470a63c14d32a087997"
};

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();