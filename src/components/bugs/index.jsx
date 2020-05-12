import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import LinkTag from "@material-ui/core/Link";
import AddBugIcon from "@material-ui/icons/PostAdd";
import BugResolvedIcon from "@material-ui/icons/PlaylistAddCheck";
import ResolveIcon from "@material-ui/icons/DoneOutline";
import DeleteIcon from "@material-ui/icons/Delete";

import {
  loadBugs,
  getUnresolvedBugs,
  getResolvedBugs,
  resolveBug,
  removeBug,
} from "../../store/bugs";
import Table from "../common/table";
import Status from "../common/status";
import useQuery from "../hooks/useQuery";
import Published from "../common/Published";

const Bugs = () => {
  const dispatch = useDispatch();
  let query = useQuery();
  const projectId = query.get("project");
  const resolved = query.get("resolved");
  const bugs = useSelector(
    resolved ? getResolvedBugs(projectId) : getUnresolvedBugs(projectId)
  );

  useEffect(() => {
    dispatch(loadBugs());
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
          to={`issue/${bug.id}?project=${query.get("project")}`}
        >
          {bug.title}
        </LinkTag>
      ),
    },
    {
      id: "createdAt",
      label: "Created",
      content: (bug) => <Published time={bug.createdAt} />,
    },
    {
      id: "priority",
      label: "priority",
    },
    {
      key: "status",
      label: "Status",
      align: "center",
      content: (bug) => <Status bug={bug} />,
    },
    {
      key: "resolve",
      label: "resolve",
      content: (bug) => (
        <IconButton
          onClick={() => dispatch(resolveBug(bug.id))}
          color="primary"
        >
          <ResolveIcon />
        </IconButton>
      ),
    },
    {
      key: "delete",
      label: "delete",
      content: (bug) => (
        <IconButton onClick={() => dispatch(removeBug(bug.id))} color="inherit">
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
          to={`issue/${bug.id}?project=${query.get("project")}`}
        >
          {bug.title}
        </LinkTag>
      ),
    },
    {
      id: "createdAt",
      label: "Created",
      content: (bug) => <Published time={bug.createdAt} />,
    },

    resolved && {
      id: "updatedAt",
      label: "finished",
      content: (bug) => <Published time={bug.updatedAt} />,
    },
    {
      key: "status",
      label: "Status",
      align: "center",
      content: (bug) => <Status bug={bug} />,
    },
  ];

  return (
    <Grid container spacing={3}>
      <Grid container item xs={12} justify="space-between">
        <Grid item xs={2}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddBugIcon />}
            component={Link}
            to={`issue/new?project=${query.get("project")}`}
          >
            New issue
          </Button>
        </Grid>
        <Grid item xs={2.5}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<BugResolvedIcon />}
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
