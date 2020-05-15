import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

import { apiCallBegan } from "./api";
import { loginWithJwt } from "../services/authService";

const slice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    status: "initial",
  },
  reducers: {
    userRequested: (users, action) => {
      users.loading = true;
    },
    userReceived: (users, action) => {
      loginWithJwt(action.payload.user.token);
      users.loading = false;
      users.status = "success";
    },
    userRequestFailed: (users, action) => {
      users.loading = false;
      users.status = "failed";
    },
  },
});

const { userRequested, userReceived, userRequestFailed } = slice.actions;
export default slice.reducer;

//Action Creators
const url = "/users";
const authUrl = "/users/login";

export const registerUser = (user) =>
  apiCallBegan({
    url,
    method: "post",
    data: user,
    onStart: userRequested.type,
    onSuccess: userReceived.type,
    onError: userRequestFailed.type,
  });

export const loginUser = (user) =>
  apiCallBegan({
    url: authUrl,
    method: "post",
    data: user,
    onStart: userRequested.type,
    onSuccess: userReceived.type,
    onError: userRequestFailed.type,
  });

// Selector
export const getUser = createSelector(
  (state) => state.entities.auth,
  (users) => users
);

export const getLoading = createSelector(
  (state) => state.entities.auth.loading,
  (loading) => loading
);

export const getStatus = createSelector(
  (state) => state.entities.auth.status,
  (status) => status
);
