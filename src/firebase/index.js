import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCH3-0RkU6hmWLIE_-dnc46vFA9xxFtJxU',
  authDomain: 'uwork-prot.firebaseapp.com',
  projectId: 'uwork-prot',
  storageBucket: 'uwork-prot.appspot.com',
  messagingSenderId: '597508500628',
  appId: '1:597508500628:web:b4388d5ef90c46d6849881',
  measurementId: 'G-8DGGHPJH7Q',
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, db, googleAuthProvider };
