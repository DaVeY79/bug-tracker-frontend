import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import BuildIcon from "@material-ui/icons/Build";

import { loadBugs, getResolvedBugs } from "../../store/bugs";
import Table from "../common/table";
import useQuery from "../hoc/useQuery";

const Resolved = () => {
  const disptach = useDispatch();
  let query = useQuery();
  const history = useHistory();
  const bugs = useSelector(getResolvedBugs(query.get("project")));

  useEffect(() => {
    disptach(loadBugs());
  }, []);

  const handleClick = () => {
    console.log(history);
    history.goBack();
    // history.replace(`issue?project=${query.get("project")}`);
  };

  const columns = [
    {
      id: "title",
      label: "Issues",
    },
    {
      id: "created",
      label: "Created",
    },
    {
      id: "finished",
      label: "finished",
    },
    {
      key: "status",
      label: "Status",
      content: (bug) => (
        <div>
          {bug.resolved ? "Completed" : bug.userId ? "Assigned" : "Pending"}
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
            to="issue/new"
          >
            New issue
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<BuildIcon />}
            component={Link}
            // to={`issue?project=${query.get("project")}`}
            onClick={handleClick}
          >
            View Remaining
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Table rows={bugs} columns={columns} />
      </Grid>
    </Grid>
  );
};

export default Resolved;
