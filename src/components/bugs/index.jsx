import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import LinkTag from "@material-ui/core/Link";
import AddIcon from "@material-ui/icons/Add";
import DoneIcon from "@material-ui/icons/Done";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import DeleteIcon from "@material-ui/icons/Delete";

import {
  loadBugs,
  getUnresolvedBugs,
  getResolvedBugs,
  resolveBug,
  removeBug,
} from "../../store/bugs";
import Table from "../common/table";
import useQuery from "../hooks/useQuery";

const Bugs = () => {
  const disptach = useDispatch();
  let query = useQuery();
  const projectId = query.get("project");
  const resolved = query.get("resolved");

  const bugs = useSelector(
    resolved ? getResolvedBugs(projectId) : getUnresolvedBugs(projectId)
  );

  useEffect(() => {
    disptach(loadBugs());
  }, []);

  const columns = [
    {
      id: "title",
      label: "Issues",
      content: (bug) => (
        <LinkTag
          variant="body1"
          color="secondary"
          component={Link}
          to={`issue/${bug.id}`}
        >
          {bug.title}
        </LinkTag>
      ),
    },
    {
      id: "created",
      label: "Created",
    },
    {
      id: "priority",
      label: "priority",
    },
    {
      key: "status",
      label: "Status",
      content: (bug) => (
        <div>
          {(bug.resolved && "Completed") || bug.userId ? "Assigned" : "Pending"}
        </div>
      ),
    },
    {
      key: "resolve",
      label: "resolve",
      content: (bug) => (
        <IconButton
          onClick={() => disptach(resolveBug(bug.id))}
          color="primary"
        >
          <DoneOutlineIcon />
        </IconButton>
      ),
    },
    {
      key: "delete",
      label: "delete",
      content: (bug) => (
        <IconButton onClick={() => disptach(removeBug(bug.id))} color="inherit">
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  const resolvedColumns = [
    {
      id: "title",
      label: "Issues",
      content: (bug) => (
        <LinkTag
          variant="body1"
          color="secondary"
          component={Link}
          to={`issue/${bug.id}`}
        >
          {bug.title}
        </LinkTag>
      ),
    },
    {
      id: "created",
      label: "Created",
    },

    resolved && {
      id: "finished",
      label: "finished",
    },
    {
      key: "status",
      label: "Status",
      content: (bug) => (
        <div>
          {(bug.resolved && "Completed") || bug.userId ? "Assigned" : "Pending"}
        </div>
      ),
    },
  ];

  return (
    <Grid container spacing={3}>
      <Grid container item xs={12} spacing={3} justify="space-between">
        <Grid item xs={3}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            component={Link}
            to={`issue/new?project=${query.get("project")}`}
          >
            New issue
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DoneIcon />}
            component={Link}
            to={`issue?project=${query.get("project")}&resolved=${true}`}
          >
            View Completed
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Table rows={bugs} columns={resolved ? resolvedColumns : columns} />
      </Grid>
    </Grid>
  );
};

export default Bugs;
