import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import LinkTag from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import BugReportIcon from "@material-ui/icons/BugReport";
import MemberIcon from "@material-ui/icons/People";

import { loadProjects, getProjects } from "../../store/projects";
import Table from "../common/table";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  iconContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    "& p": {
      paddingRight: 3,
    },
  },
}));

const Projects = () => {
  const classes = useStyles();
  const disptach = useDispatch();
  const projects = useSelector(getProjects);

  useEffect(() => {
    disptach(loadProjects());
  }, []);

  const columns = [
    {
      id: "name",
      label: "Name",
      content: (project) => (
        <LinkTag
          variant="body1"
          // color="secondary"
          color="primary"
          component={Link}
          to={`issue?project=${project.id}`}
        >
          {project.name}
        </LinkTag>
      ),
    },
    {
      id: "issues",
      label: "issues",
      content: (project) => (
        <Box className={classes.iconContainer}>
          <Typography variant="body1">{project.bugId.length}</Typography>
          <BugReportIcon />
        </Box>
      ),
      align: "center",
    },
    {
      id: "members",
      label: "members",
      content: (project) => (
        <Box className={classes.iconContainer}>
          <Typography variant="body1">{project.userId.length}</Typography>
          <MemberIcon />
        </Box>
      ),
      align: "center",
    },
    {
      key: "edit",
      content: (project) => (
        <IconButton
          component={Link}
          to={`project/${project.id}`}
          color="primary"
        >
          <EditIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          component={Link}
          to="project/new"
        >
          New Project
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Table rows={projects} columns={columns} />
      </Grid>
    </Grid>
  );
};

export default Projects;
