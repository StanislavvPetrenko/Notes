import { UPD_NOTE_INFO, ONE_NOTE_LOAD_REQUEST, ONE_NOTE_LOAD_SUCCESS, ONE_NOTE_LOAD_ERROR, CLEAR_NOTE_INFO } from './constants';

const initialState = {
  data: {
    body: '',
    id: ''
  },
  loading: true
};

const oneNoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPD_NOTE_INFO:
      return {
        ...state,
        data: action.payload
      };
    case ONE_NOTE_LOAD_REQUEST:
      return {
        ...state,
        loading: true
      };
    case ONE_NOTE_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case ONE_NOTE_LOAD_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
      case CLEAR_NOTE_INFO:
      return {
        ...state,
        data: {}
      };

    default:
      return state
  }
};

export default oneNoteReducer;