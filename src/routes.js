import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import AddBugs from "./components/bugs/Add";
import Bugs from "./components/bugs";
import AddProjects from "./components/projects/Add";
import Projects from "./components/projects";
import NotFound from "./components/NotFound";
import Logout from "./components/auth/Logout";

export default function Routes() {
  return (
    <div>
      <Switch>
        <Route path="/logout" component={Logout} />
        <Route path="/project/:id" component={AddProjects} />
        <Route path="/project" component={Projects} />
        <Route path="/issue/:id" component={AddBugs} />
        <Route path="/issue" component={Bugs} />
        <Route path="/not-found" component={NotFound} />
        <Redirect path="/" to="/project" />
        <Redirect to="/not-found" />
      </Switch>
    </div>
  );
}
