import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import {
  loadBugs,
  getUnresolvedBugs,
  resolveBug,
  removeBug,
} from "../store/bugs";

const Bugs = () => {
  const disptach = useDispatch();
  const bugs = useSelector(getUnresolvedBugs);

  useEffect(() => {
    disptach(loadBugs());
  }, []);

  return (
    <Grid container spacing={2}>
      {bugs.map((bug) => (
        <Grid container item xs={12} spacing={2} key={bug.id}>
          <Grid item>{bug.description}</Grid>
          <Grid item>
            <Button
              onClick={() => disptach(resolveBug(bug.id))}
              variant="outlined"
              color="primary"
            >
              Resolve
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => disptach(removeBug(bug.id))}
              variant="outlined"
              color="secondary"
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default Bugs;
