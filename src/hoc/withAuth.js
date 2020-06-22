import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import auth from "../services/authService";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import { useSelector } from "react-redux";
import { getStatus } from "../store/auth";

export default function withAuth(Component) {
  return function WithAuth() {
    const user =
      useSelector(getStatus) === "success" || auth.getJwt() ? true : false;

    return (
      <Switch>
        <Route
          path="/login"
          render={(props) =>
            !user ? <LoginForm {...props} /> : <Redirect to="/" />
          }
        />
        <Route
          path="/register"
          render={(props) =>
            !user ? <RegisterForm {...props} /> : <Redirect to="/" />
          }
        />
        <Route
          path="/"
          render={(props) => {
            return !user ? <Redirect to="/login" /> : <Component />;
          }}
        />
      </Switch>
    );
  };
}
