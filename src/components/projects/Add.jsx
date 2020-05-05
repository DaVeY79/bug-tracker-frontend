import React, { useState } from "react";
import TextFeild from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import { useDispatch } from "react-redux";
import { addProject } from "../../store/projects";

const AddProjects = () => {
  const [state, setState] = useState({ project: "" });
  const dispatch = useDispatch();

  const handleInput = (e) => {
    const value = { ...state };
    value.project = e.target.value;
    setState(value);
  };

  const handleAddProject = () => {
    dispatch(addProject({ name: state.project }));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={10}>
        <TextFeild
          value={state.bug}
          onChange={handleInput}
          label="Project Name"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={2}>
        <Button
          onClick={handleAddProject}
          disabled={state.project ? false : true}
          variant="contained"
          color="primary"
        >
          Add Project
        </Button>
      </Grid>
      Add Add Project members :
    </Grid>
  );
};

export default AddProjects;
