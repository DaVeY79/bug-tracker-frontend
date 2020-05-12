import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";
import moment from "moment";

const tokenKey = "token2";

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
    userLogedin: (users, action) => {
      localStorage.setItem(tokenKey, action.payload.user.token);
    },
  },
});

const {
  userAdded,
  userLogedin,
  usersRequested,
  usersReceived,
  usersRequestFailed,
} = slice.actions;
export default slice.reducer;

//Action Creators
const url = "/users";
const authUrl = "/users/login";

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

export const registerUser = (user) =>
  apiCallBegan({
    url,
    method: "post",
    data: user,
    onSuccess: userLogedin.type,
  });

export const loginUser = (user) =>
  apiCallBegan({
    url: authUrl,
    method: "post",
    data: user,
    onSuccess: userLogedin.type,
  });

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
