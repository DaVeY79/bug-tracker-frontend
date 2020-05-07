import React from "react";
import TextFeild from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import SelectInput from "../common/selectInput";
import MultiSelect from "../common/multiSelect";

import { useDispatch, useSelector } from "react-redux";
import { addProject } from "../../store/projects";
import { getUsers, loadUsers } from "../../store/users";

const AddProjects = () => {
  const [state, setState] = React.useState({
    name: "",
    managerId: "",
    userIds: [],
  });
  const dispatch = useDispatch();
  const users = useSelector(getUsers);

  React.useEffect(() => {
    dispatch(loadUsers());
  }, []);

  const handleChange = (e) => {
    const value = { ...state };
    value[e.target.name] = e.target.value;
    setState(value);
  };

  const handleAddProject = () => {
    dispatch(addProject({ ...state.project }));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        Add New Project
      </Grid>
      <Grid item xs={12}>
        <TextFeild
          value={state.name}
          name="name"
          onChange={handleChange}
          label="Project Name"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <SelectInput
          label=" Project Manager"
          name="managerId"
          items={users}
          value={state.managerId}
          handleChange={handleChange}
        />
      </Grid>
      <Grid item xs={6}>
        <MultiSelect
          label="Add Users"
          name="userIds"
          items={users}
          value={state.userIds}
          handleChange={handleChange}
        />
      </Grid>
      <Grid item xs={2}>
        <Button
          onClick={handleAddProject}
          disabled={state.name ? false : true}
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
