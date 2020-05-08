import React from "react";
import { useHistory, useParams } from "react-router-dom";
import TextFeild from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import SelectInput from "../common/selectInput";
import MultiSelect from "../common/multiSelect";

import { useDispatch, useSelector } from "react-redux";
import {
  addProject,
  updateProject,
  loadProjects,
  getProject,
} from "../../store/projects";
import { getUsers, loadUsers } from "../../store/users";

const AddProjects = () => {
  const [state, setState] = React.useState({
    data: {
      name: "",
      managerId: "",
      userIds: [],
    },
    errors: {},
  });
  const didMount = React.useRef(false);

  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  const users = useSelector(getUsers);
  const project = useSelector(getProject(params.id));

  React.useEffect(() => {
    dispatch(loadProjects());
    dispatch(loadUsers());
  }, []);

  React.useEffect(() => {
    populateProject();
  }, [project]);

  const populateProject = () => {
    if (params.id === "new") return;

    const value = { ...state };
    value.data = { ...value.data, ...project[0] };

    if (project.length !== 0 && !didMount.current) {
      setState(value);
      didMount.current = true;
    }
  };

  const handleChange = (e) => {
    const value = { ...state };
    // console.log(e.target.name, ": ", e.target.value);
    value.data[e.target.name] = e.target.value;
    setState(value);
  };

  const handleSave = () => {
    console.log(state.data);
    if (params.id === "new") {
      dispatch(addProject({ ...state.data }));
    } else {
      dispatch(updateProject(params.id, state.data));
    }
    history.goBack();
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        Add New Project
      </Grid>
      <Grid item xs={12}>
        <TextFeild
          value={state.data.name}
          name="name"
          onChange={handleChange}
          label="Project Name"
          placeholder="Write name of Project here..."
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <SelectInput
          label=" Project Manager"
          name="managerId"
          items={users}
          value={state.data.managerId}
          handleChange={handleChange}
        />
      </Grid>
      <Grid item xs={6}>
        <MultiSelect
          label="Add Users"
          name="userIds"
          items={users}
          value={state.data.userIds}
          handleChange={handleChange}
        />
      </Grid>
      <Grid item xs={2}>
        <Button
          onClick={handleSave}
          disabled={state.data.name ? false : true}
          variant="contained"
          color="primary"
        >
          Add Project
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddProjects;
