const selectNotes = state => state.notesList;

export const selectNotesListData = state => selectNotes(state).data;
export const selectNotesListLoading = state => selectNotes(state).loading;