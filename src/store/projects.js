import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";
import moment from "moment";

const slice = createSlice({
  name: "projects",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    projectsRequested: (projects, action) => {
      projects.loading = true;
    },
    projectsReceived: (projects, action) => {
      projects.list = action.payload;
      projects.loading = false;
      projects.lastFetch = Date.now();
    },
    projectsRequestFailed: (projects, action) => {
      projects.loading = false;
    },
    projectAdded: (projects, action) => {
      projects.list.push(action.payload);
    },
  },
});

const {
  projectAdded,
  projectsRequested,
  projectsReceived,
  projectsRequestFailed,
} = slice.actions;
export default slice.reducer;

//Action Creators
const url = "/projects";

export const loadProjects = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.projects;

  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 10) return;

  return dispatch(
    apiCallBegan({
      url,
      onStart: projectsRequested.type,
      onSuccess: projectsReceived.type,
      onError: projectsRequestFailed.type,
    })
  );
};

export const addProject = (project) =>
  apiCallBegan({
    url,
    method: "post",
    data: project,
    onSuccess: projectAdded.type,
  });

//selector
export const getProjects = createSelector(
  (state) => state.entities.projects.list,
  (projects) => projects
);
