import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import DoneIcon from "@material-ui/icons/Done";

import { loadBugs, getResolvedBugs } from "../../store/bugs";
import Table from "../common/table";
import useQuery from "../hoc/useQuery";

const Resolved = () => {
  const disptach = useDispatch();
  let query = useQuery();
  const bugs = useSelector(getResolvedBugs(query.get("project")));

  useEffect(() => {
    disptach(loadBugs());
  }, []);

  const columns = [
    {
      id: "description",
      label: "Task",
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
      id: "status",
      label: "Status",
    },
  ];

  return (
    <Grid container spacing={3}>
      <Grid container item xs={12} spacing={3}>
        <Grid item xs={4}>
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
        <Grid item xs={4}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DoneIcon />}
            component={Link}
            to="issue"
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
