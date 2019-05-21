const selectAuth = state => state.auth;

export const selectAuthLoading = state => selectAuth(state).loading;
export const selectAuthUser = state => selectAuth(state).user;