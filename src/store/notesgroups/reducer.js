import { NOTES_GROUPS_LOAD_REQUEST,
  NOTES_GROUPS_LOAD_SUCCESS,
  NOTES_GROUPS_LOAD_ERROR,
  ADD_NEW_NOTES_GROUP,
  DEL_NOTES_GROUP,
  UPD_NOTES_GROUPS } from './constants';


const initialState = {
  data: {},
  loading: true
};

const notesGroupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTES_GROUPS_LOAD_REQUEST:
      return {
        ...state,
        loading: true
      };
    case NOTES_GROUPS_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case NOTES_GROUPS_LOAD_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case ADD_NEW_NOTES_GROUP:
      return {
        ...state,
        data: action.payload
      };
    case DEL_NOTES_GROUP:
      return {
        ...state,
        data: state.data.filter((el) => el.id !== action.payload)
      };
    case UPD_NOTES_GROUPS:
      return {
        ...state,
        data: action.payload
      };
    default:
      return state
  }
};

export default notesGroupsReducer;