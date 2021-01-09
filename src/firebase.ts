import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCp0t5eFot6mgG1_u_ZZHCmAvmSNortXYQ',
  authDomain: 'daily-moments-25049.firebaseapp.com',
  databaseURL: 'https://daily-moments-25049-default-rtdb.firebaseio.com',
  projectId: 'daily-moments-25049',
  storageBucket: 'daily-moments-25049.appspot.com',
  messagingSenderId: '841574956051',
  appId: '1:841574956051:web:4c2281335553f48a9d93e6',
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const firestore = app.firestore();
export const storage = app.storage();
