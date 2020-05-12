import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import TextFeild from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { addBug, updateBug, loadBugs, getBug } from "../../store/bugs";
import { loadUsers, getUsersByProject } from "../../store/users";
import useQuery from "../hooks/useQuery";
import RadioButton from "../common/radioButton";
import SelectInput from "../common/selectInput";

const AddBugs = () => {
  const [state, setState] = useState({
    data: {
      title: "",
      details: "",
      priority: "Low",
      userId: "",
    },
    errors: {},
  });
  const didMount = React.useRef(false);

  const dispatch = useDispatch();
  const params = useParams();
  const query = useQuery();
  const history = useHistory();

  const users = useSelector(getUsersByProject(parseInt(query.get("project"))));
  const bug = useSelector(getBug(params.id));

  useEffect(() => {
    dispatch(loadBugs());
    dispatch(loadUsers());
  }, []);

  useEffect(() => {
    populateBug();
  }, [bug]);

  const populateBug = () => {
    if (params.id === "new") return;

    const value = { ...state };
    value.data = { ...value.data, ...bug[0] };
    if (bug.length !== 0 && !didMount.current) {
      setState(value);
      didMount.current = true;
    }
  };

  const handleChange = (e) => {
    const value = { ...state };
    value.data[e.target.name] = e.target.value;
    setState(value);
  };

  const handleSave = () => {
    // console.log("submit data", state.data);

    if (params.id === "new") {
      dispatch(addBug({ ...state.data, projectId: query.get("project") }));
    } else {
      const value = { ...state.data };
      delete value.id;
      // console.log("state", value);
      dispatch(updateBug(params.id, value));
    }

    history.goBack();
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">
          {params.id === "new" ? "Add New Bug" : "Update Existing Bug"}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextFeild
          value={state.data.title}
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
          value={state.data.details}
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
      <Grid item xs={6}>
        <RadioButton
          formlabel="Priority"
          name="priority"
          inputProps={{ "aria-label": "Radio A", row: false }}
          radiolabels={["Low", "Medium", "High"]}
          value={state.data.priority}
          handleChange={handleChange}
        />
      </Grid>
      <Grid item xs={6}>
        <SelectInput
          label="Assign To User"
          name="userId"
          items={users}
          value={state.data.userId}
          handleChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          onClick={handleSave}
          disabled={state.data.title ? false : true}
          variant="contained"
          color="primary"
        >
          {params.id === "new" ? "Add Bug" : "Update bug"}
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddBugs;
