import { AUTH_ADD_USER, AUTH_REQUEST, AUTH_SUCCESS, AUTH_ERROR, LOG_OUT } from './constants';

const initialState = {
  user: undefined,
  loading: true
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return {
        ...state,
        loading: true
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case AUTH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case AUTH_ADD_USER:
      return {
        ...state,
        user: action.payload
      };
    case LOG_OUT:
      return {
        ...state,
        user: undefined
      };
    default:
      return state
  }
};

export default authReducer;