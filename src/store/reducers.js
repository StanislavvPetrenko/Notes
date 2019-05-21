import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import auth from './authentication/';
import notesList from './noteslist/';
import oneNote from './onenote/';
import notesGroups from './notesgroups/';

export default (history) => combineReducers({
  router: connectRouter(history),
  auth,
  notesList,
  oneNote,
  notesGroups
});
