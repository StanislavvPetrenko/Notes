// import * as firebase from 'firebase';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBuAZXxna4lbw-a0Pbu1GsDTi5yaNsa7JA",
  authDomain: "react-redux-thunk-638a6.firebaseapp.com",
  databaseURL: "https://react-redux-thunk-638a6.firebaseio.com",
  projectId: "react-redux-thunk-638a6",
  storageBucket: "react-redux-thunk-638a6.appspot.com",
  messagingSenderId: "768048200088",
  appId: "1:768048200088:web:fe1b83fac6053e03"
};

firebase.initializeApp(firebaseConfig);

export default firebase;