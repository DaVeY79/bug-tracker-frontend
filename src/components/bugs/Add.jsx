import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import TextFeild from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";

import { addBug } from "../../store/bugs";
import { loadUsers, getUsers } from "../../store/users";
import useQuery from "../hoc/useQuery";
import RadioButton from "../common/radioButton";
import SelectInput from "../common/selectInput";

const AddBugs = () => {
  const [state, setState] = useState({
    data: {
      title: "",
      details: "",
      priority: "Low",
      status: "Pending",
      userId: "",
    },
    errors: {},
  });

  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const users = useSelector(getUsers(query.get("project")));

  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  const handleChange = (e) => {
    const value = { ...state };
    value.data[e.target.name] = e.target.value;
    setState(value);
  };

  const handleSave = () => {
    // console.log(state.data);
    dispatch(addBug({ ...state.data, projectId: query.get("project") }));
    history.goBack();
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextFeild
          value={state.title}
          name="title"
          onChange={handleChange}
          label="Bug Title"
          placeholder="Write Title of bug here..."
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextFeild
          value={state.details}
          name="details"
          onChange={handleChange}
          label="Bug Description"
          placeholder="Write Description of bug here..."
          variant="outlined"
          fullWidth
          multiline
          rows={10}
        />
      </Grid>
      <Grid item xs={4}>
        <RadioButton
          formlabel="Priority"
          name="priority"
          inputProps={{ "aria-label": "Radio A", row: false }}
          radiolabels={["Low", "Medium", "High"]}
          value={state.data.priority}
          handleChange={handleChange}
        />
      </Grid>
      <Grid item xs={4}>
        <RadioButton
          formlabel="Status"
          name="status"
          inputProps={{ "aria-label": "Radio A", row: false }}
          radiolabels={["Pending", "Assigned", "Completed"]}
          value={state.data.status}
          handleChange={handleChange}
        />
      </Grid>
      <Grid item xs={4}>
        <SelectInput
          label="Assign To User"
          name="userId"
          items={users}
          value={state.data.userId}
          handleChange={handleChange}
        />
      </Grid>
      <Grid item xs={2}>
        <Button
          onClick={handleSave}
          disabled={state.data.title ? false : true}
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
