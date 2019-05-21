import { UPD_NOTE_INFO, ONE_NOTE_LOAD_REQUEST, ONE_NOTE_LOAD_SUCCESS, ONE_NOTE_LOAD_ERROR, CLEAR_NOTE_INFO } from './constants';

export const updNoteInfo = (data) => ({type: UPD_NOTE_INFO, payload: data});
export const oneNoteLoadRequest = () => ({type: ONE_NOTE_LOAD_REQUEST});
export const oneNoteLoadSuccess = () => ({type: ONE_NOTE_LOAD_SUCCESS});
export const clearNoteInfo = () => ({type: CLEAR_NOTE_INFO});
export const oneNoteLoadError = ({ message }) => ({type: ONE_NOTE_LOAD_ERROR, message});