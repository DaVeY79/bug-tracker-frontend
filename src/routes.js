import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import AddBugs from "./components/AddBugs";
import Bugs from "./components/Bugs";
import Resolved from "./components/Resolved";
import NotFound from "./components/NotFound";

export default function Routes() {
  return (
    <div>
      <Switch>
        <Route path="/issue-resolved" component={Resolved} />
        <Route path="/issue/:id" component={AddBugs} />
        <Route path="/issue" component={Bugs} />
        <Route path="/not-found" component={NotFound} />
        <Redirect path="/" to="/issue" />
        <Redirect to="/not-found" />
      </Switch>
    </div>
  );
}
