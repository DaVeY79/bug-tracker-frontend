import React, { useState } from "react";
import TextFeild from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import { useDispatch } from "react-redux";
import { addBug } from "../store/bugs";

const AddBugs = () => {
  const [state, setState] = useState({ bug: "" });
  const dispatch = useDispatch();

  const handleInput = (e) => {
    const value = { ...state };
    value.bug = e.target.value;
    setState(value);
  };

  const handleAddBug = () => {
    dispatch(addBug({ description: state.bug }));
    setState({ bug: "" });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={10}>
        <TextFeild
          value={state.bug}
          onChange={handleInput}
          label="Describe bug"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={2}>
        <Button
          onClick={handleAddBug}
          disabled={state.bug ? false : true}
          variant="contained"
          color="primary"
        >
          Add Bug
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddBugs;
