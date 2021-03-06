import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";
import moment from "moment";
import { getUserId } from "../services/authService";

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
      projects.list = action.payload.projects;
      projects.loading = false;
      projects.lastFetch = Date.now();
    },
    projectsRequestFailed: (projects, action) => {
      projects.loading = false;
    },
    projectAdded: (projects, action) => {
      projects.list.push(action.payload.project);
    },
    projectUpdated: (projects, action) => {
      const index = projects.list.findIndex(
        (project) => project.id === action.payload.id
      );
      projects.list[index] = action.payload.project;
    },
  },
});

const {
  projectAdded,
  projectUpdated,
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

export const updateProject = (projectId, project) =>
  apiCallBegan({
    url: url + "/" + projectId,
    method: "put",
    data: project,
    onSuccess: projectUpdated.type,
  });

//selector
export const getProjects = createSelector(
  (state) => state.entities.projects.list,
  (projects) =>
    projects.filter(({ createdBy, managerId, userId }) => {
      const user = parseInt(getUserId());

      return createdBy === user || managerId === user || userId.includes(user);
    })
);

export const getProject = (projectId) =>
  createSelector(
    (state) => state.entities.projects.list,
    (projects) => projects.filter((project) => project.id === projectId)
  );
