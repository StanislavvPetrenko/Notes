import { NOTES_LIST_LOAD_REQUEST,
          NOTES_LIST_LOAD_SUCCESS,
          NOTES_LIST_LOAD_ERROR,
          UPD_NOTES_LIST,
          DEL_NOTE_FROM_LIST,
          ADD_NOTE_TO_LIST } from './constants';

const initialState = {
  data: [],
  // detail: {},
  loading: true
};

const notesListReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTES_LIST_LOAD_REQUEST:
      return {
        ...state,
        loading: true
      };
    case NOTES_LIST_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case NOTES_LIST_LOAD_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case UPD_NOTES_LIST:
      return {
        ...state,
        data: action.payload
      };
    case DEL_NOTE_FROM_LIST:
      return {
        ...state,
        data: state.data.filter((el) => el.id !== action.payload)
    };
    case ADD_NOTE_TO_LIST:
      return {
        ...state,
        data: [...state.data, action.payload]
      };
    default:
      return state
  }
};

export default notesListReducer;