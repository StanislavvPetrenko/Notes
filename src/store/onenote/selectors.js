const selectOneNote = state => state.oneNote;

export const selectOneNoteData = state => selectOneNote(state).data;
export const selectOneNoteLoading = state => selectOneNote(state).loading;