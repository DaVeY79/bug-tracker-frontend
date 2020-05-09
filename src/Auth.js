import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import App from "./App";
// import auth from "./services/authService";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";

export default function Auth(props) {
  const [user, setUser] = useState(
    // auth.getJwt() ? true :
    false
  );

  const handleUserChange = () => {
    setUser(true);
  };

  return (
    <Switch>
      <Route
        path="/login"
        render={(props) =>
          !user ? (
            <LoginForm {...props} handleUserChange={handleUserChange} />
          ) : (
            <Redirect to="/" />
          )
        }
      />
      <Route
        path="/register"
        render={(props) =>
          !user ? (
            <RegisterForm {...props} handleUserChange={handleUserChange} />
          ) : (
            <Redirect to="/" />
          )
        }
      />
      <Route
        path="/"
        render={(props) => {
          return !user ? <Redirect to="/login" /> : <App {...props} />;
        }}
      />
    </Switch>
  );
}
