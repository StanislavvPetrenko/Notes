import { push } from 'connected-react-router';
import firebase from '../firebase';

import { authenticateAddUser, authenticateRequest, authenticateSuccess, authenticateError, logOutUser } from './actions';

const makeUser = user => ({
  uid: user.uid,
  email: user.email
});

export const authenticate = (email, password) => dispatch => {
  dispatch(authenticateRequest());

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(({ user }) => {
      dispatch(authenticateAddUser(makeUser(user)));
      dispatch(authenticateSuccess());
      dispatch(push('/'));
    })
    .catch(({ message }) => {
      dispatch(authenticateError(message));
    })
};

export const registrationUser = (email, password) => dispatch => {
  dispatch(authenticateRequest());

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(({ user }) => {
      dispatch(authenticateAddUser(makeUser(user)));
      dispatch(authenticateSuccess());
      dispatch(push('/login'));
    })
    .catch( ({ message }) => {
      dispatch(authenticateError(message));
    });
};

export const subscribeChangeUser = () => dispatch => {

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      dispatch(authenticateAddUser(makeUser(user)));
      dispatch(authenticateSuccess());
    } else {
      dispatch(logOutUser());
      dispatch(authenticateSuccess());
    }
  })
};

export const signOut = () => dispatch => {

  firebase.auth().signOut().then(() => {
      dispatch(logOutUser());
  })
};


// export const registrationUser = (email, password, nickname) => dispatch => {
//   dispatch(authenticateRequest());
//
//   firebase.auth().createUserWithEmailAndPassword(email, password)
//     .then(({ user }) => {
//       dispatch(authenticateSuccess(makeUser(user)));
//     })
//     .then(() => {
//
//       firebase.auth().currentUser.updateProfile({
//         displayName: nickname
//       }).then(function() {
//         // Update successful.
//       }).catch(function(error) {
//         // An error happened.
//       });
//
//       const uid = firebase.auth().currentUser.uid;
//       console.log('There!', uid);
//
//       dispatch(authenticateRequest());
//
//       firebase.firestore().collection('users').doc(`${uid}`).set({
//         name: nickname,
//       })
//         .then(function() {
//           console.log('Document successfully written!');
//           dispatch(authenticateSuccess());
//         })
//         .catch(function({ message }) {
//           console.error('Error writing document: ', message);
//           dispatch(authenticateError(message));
//         });
//     })
//     .catch(function ({ message }) {
//       dispatch(authenticateError(message));
//     });
// };