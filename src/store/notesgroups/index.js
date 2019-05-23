import notesGroupsReducer from './reducer';

export { notesGroupLoadRequest,
        notesGroupLoadSuccess,
        notesGroupLoadError,
        addNewNotesGroup,
        delNotesGroup,
        updateNotesGroups} from './actions';

export { addNewGroup, getGroupsCollection, handleDeleteGroup } from './thunk';
export { selectNotesGroupsData, selectNotesGroupsLoading } from './selectors';

export default notesGroupsReducer;