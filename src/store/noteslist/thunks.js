import { push } from 'connected-react-router';
import firebase from '../firebase';
import { updateNotesList,
        notesLoadRequest,
        notesLoadSuccess,
        notesLoadError,
        deleteNoteFromState,
        addNoteToState,
        setNote } from './actions';

export const addNewNote = (body, group) => dispatch => {
  dispatch(notesLoadRequest());
  const uid = firebase.auth().currentUser.uid;
  console.log('Add new noteslist!', uid);

  firebase.firestore().collection('notes').add(
    {
      body: body,
      group: group || "all",
      deleted: false,
      userId: uid
    })
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
      console.log('Document written with group: ', group);
      const note = {
        body: body,
        group: group || "all",
        deleted: false,
        id: docRef.id
      };
      dispatch(addNoteToState(note));
      dispatch(notesLoadSuccess());
      dispatch(push('/'));
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
      dispatch(notesLoadError(error));
    });
};

export const getNotesCollection = () => dispatch => {
  dispatch(notesLoadRequest());
  const notes = [];
  const uid = firebase.auth().currentUser.uid;

  firebase.firestore().collection('notes').where('userId', "==", uid)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const note = {
          body: doc.data().body,
          group: doc.data().group,
          deleted: doc.data().deleted,
          id: doc.id,
        };
        notes.push(note);
      });
      dispatch(updateNotesList(notes));
      dispatch(notesLoadSuccess());
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
      dispatch(notesLoadError(error));
    });
};

export const handleDeleteNote = (id) => dispatch => {

  firebase.firestore().collection('notes').doc(id).delete().then(() => {
    console.log("Document successfully deleted!");
    dispatch(deleteNoteFromState(id))
  }).catch((error) => {
    console.error("Error removing document: ", error);
  });
};

export const handleSetNotes = (note) => dispatch => {
  console.log('This text will save');

  const uid = firebase.auth().currentUser.uid;

  firebase.firestore().collection('notes').doc(note.id).set({
    body: note.body,
    group: note.group,
    deleted: note.deleted,
    userId: uid
  })
    .then(() => {
      console.log("Document successfully written!");
      dispatch(setNote({
        body: note.body,
        group: note.group,
        deleted: note.deleted,
        id: note.id}));
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
};

// export const addNewNote = (title, body) => dispatch => {
//
//   const uid = firebase.auth().currentUser.uid;
//   console.log('Add new noteslist!', uid);
//
//   firebase.firestore().collection('noteslist').doc(`${uid}`).collection('noteslist').add(
//     {
//       title: title,
//       body: body
//     })
//     .then(function(docRef) {
//       console.log('Document written with ID: ', docRef.id);
//     })
//     .catch(function(error) {
//       console.error('Error adding document: ', error);
//       dispatch(authenticateError(error));
//     });
// };