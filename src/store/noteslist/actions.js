import { UPD_NOTES_LIST,
        NOTES_LIST_LOAD_REQUEST,
        NOTES_LIST_LOAD_SUCCESS,
        NOTES_LIST_LOAD_ERROR,
        DEL_NOTE_FROM_LIST,
        ADD_NOTE_TO_LIST,
        SET_NOTES_LIST_FILTER,
        SET_NOTE } from './constants';

export const updateNotesList = (data) => ({type: UPD_NOTES_LIST, payload: data});
export const notesLoadRequest = () => ({type: NOTES_LIST_LOAD_REQUEST});
export const notesLoadSuccess = () => ({type: NOTES_LIST_LOAD_SUCCESS});
export const notesLoadError = ({ message }) => ({type: NOTES_LIST_LOAD_ERROR, message});
export const deleteNoteFromState = (id) => ({type: DEL_NOTE_FROM_LIST, payload: id});
export const addNoteToState = (data) => ({type: ADD_NOTE_TO_LIST, payload: data});
export const setNotesListFilter = (data) => ({type: SET_NOTES_LIST_FILTER, payload: data});
export const setNote = (data) => ({type: SET_NOTE, payload: data});