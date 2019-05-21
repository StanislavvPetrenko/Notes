import { AUTH_ADD_USER, AUTH_REQUEST, AUTH_SUCCESS, AUTH_ERROR, LOG_OUT } from './constants';

export const authenticateAddUser = (user) => ({type: AUTH_ADD_USER, payload: user});
export const authenticateRequest = () => ({type: AUTH_REQUEST});
export const authenticateSuccess = () => ({type: AUTH_SUCCESS});
export const authenticateError = ( { message }) => ({type: AUTH_ERROR, message});
export const logOutUser = () => ({type: LOG_OUT});