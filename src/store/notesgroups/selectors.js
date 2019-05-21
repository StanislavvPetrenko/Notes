const selectNotesGroups = state => state.notesGroups;

export const selectNotesGroupsData = state => selectNotesGroups(state).data;
export const selectNotesGroupsLoading = state => selectNotesGroups(state).loading;