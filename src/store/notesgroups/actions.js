import { NOTES_GROUPS_LOAD_REQUEST,
        NOTES_GROUPS_LOAD_SUCCESS,
        NOTES_GROUPS_LOAD_ERROR,
        ADD_NEW_NOTES_GROUP,
        DEL_NOTES_GROUP,
        UPD_NOTES_GROUPS } from './constants';

export const notesGroupLoadRequest = () => ({type: NOTES_GROUPS_LOAD_REQUEST});
export const notesGroupLoadSuccess = () => ({type: NOTES_GROUPS_LOAD_SUCCESS});
export const notesGroupLoadError = ({ message }) => ({type: NOTES_GROUPS_LOAD_ERROR, message});
export const addNewNotesGroup = (id) => ({type: ADD_NEW_NOTES_GROUP, payload: id});
export const delNotesGroup = (data) => ({type: DEL_NOTES_GROUP, payload: data});
export const updateNotesGroups = (data) => ({type: UPD_NOTES_GROUPS, payload: data});
