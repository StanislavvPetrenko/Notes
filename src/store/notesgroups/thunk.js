import firebase from '../firebase';
import { push } from 'connected-react-router';

import {notesGroupLoadRequest,
        notesGroupLoadSuccess,
        notesGroupLoadError,
        addNewNotesGroup,
        delNotesGroups,
        updateNotesGroups} from './actions';

export const addNewGroup = (name) => dispatch => {
  dispatch(notesGroupLoadRequest());
  const uid = firebase.auth().currentUser.uid;
  console.log('Add new group!', uid);

  firebase.firestore().collection('groups').add(
    {
      name: name,
      userId: uid,
    })
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
      const group = {
        name: name,
        id: docRef.id
      };
      dispatch(addNewNotesGroup(group));
      dispatch(notesGroupLoadSuccess());
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
      dispatch(notesGroupLoadError(error));
    });
};

export const getGroupsCollection = () => dispatch => {
  dispatch(notesGroupLoadRequest());
  const groups = [];
  const uid = firebase.auth().currentUser.uid;

  firebase.firestore().collection('groups').where('userId', "==", uid)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const group = {
          name: doc.data().name,
          id: doc.id
        };
        groups.push(group);
      });
      console.log('Wow');
      dispatch(updateNotesGroups(groups));
      dispatch(notesGroupLoadSuccess());
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
      dispatch(notesGroupLoadError(error));
    });
};