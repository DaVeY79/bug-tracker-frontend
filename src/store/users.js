import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import moment from "moment";

import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "users",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    usersRequested: (users, action) => {
      users.loading = true;
    },
    usersReceived: (users, action) => {
      users.list = action.payload.users;
      users.loading = false;
      users.lastFetch = Date.now();
    },
    usersRequestFailed: (users, action) => {
      users.loading = false;
    },
    userAdded: (users, action) => {
      users.list.push(action.payload.user);
    },
  },
});

const {
  // userAdded,
  usersRequested,
  usersReceived,
  usersRequestFailed,
} = slice.actions;
export default slice.reducer;

//Action Creators
const url = "/users";

export const loadUsers = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.users;

  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 10) return;

  return dispatch(
    apiCallBegan({
      url,
      onStart: usersRequested.type,
      onSuccess: usersReceived.type,
      onError: usersRequestFailed.type,
    })
  );
};

// Selector
export const getUsersByProject = (projectId) =>
  createSelector(
    (state) => state.entities.users.list,
    (users) => users.filter((user) => user.projectId.includes(projectId))
  );

export const getUsers = createSelector(
  (state) => state.entities.users.list,
  (users) => users
);
