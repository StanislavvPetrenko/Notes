import { push } from 'connected-react-router';
import firebase from '../firebase';
import { updNoteInfo, oneNoteLoadRequest, oneNoteLoadSuccess, oneNoteLoadError, } from './actions';

export const getNote = (id) => dispatch => {
  dispatch(oneNoteLoadRequest());

  return firebase.firestore().collection('notes').doc(id).get().then((doc) => {
    if (doc.exists) {
      const note = {
        ...doc.data(),
        id: doc.id
      };
      // dispatch(updNoteInfo(note));
      dispatch(oneNoteLoadSuccess());
      console.log("Document data:", doc.data());
      return note;
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      return null;
    }
  }).catch(function (error) {
    console.log("Error getting document:", error);
    dispatch(oneNoteLoadError(error));
  });
};

export const saveNote = (note) => dispatch => {

  console.log(note, 'This text will save');
  const uid = firebase.auth().currentUser.uid;

  firebase.firestore().collection('notes').doc(note.id).set({
    body: note.body,
    group: note.group,
    deleted: false,
    userId: uid
  })
  .then(() => {
    console.log("Document successfully written!");
    dispatch(push('/'));
  })
  .catch((error) => {
    console.error("Error writing document: ", error);
  });
};

// export const getNote = (id) => dispatch => {
//   dispatch(oneNoteLoadRequest());
//
//   firebase.firestore().collection('notes').doc(id).get().then((doc) => {
//     if (doc.exists) {
//       const note = {
//         body: doc.data().body,
//         id: doc.id
//       };
//       dispatch(updNoteInfo(note));
//       dispatch(oneNoteLoadSuccess());
//       console.log("Document data:", note);
//     } else {
//       // doc.data() will be undefined in this case
//       console.log("No such document!");
//     }
//   }).catch(function (error) {
//     console.log("Error getting document:", error);
//     dispatch(oneNoteLoadError(error));
//   });
// };