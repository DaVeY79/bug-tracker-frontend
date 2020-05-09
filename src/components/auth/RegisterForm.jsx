import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import auth from "../../services/authService";

// import backgroundImage from "../../assets/login_background.jpg";
import TextInput from "../common/textInput";

import { makeStyles } from "@material-ui/core/styles";
import LinkTag from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  formContainer: {
    padding: 30,
    backgroundColor: "white",
    width: 450,
    height: 600,
    borderRadius: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 0,
    paddingTop: 0,
  },
  description: {
    paddingTop: 0,
  },
  button: { width: "100%", height: 45 },
}));

export default function LoginForm(props) {
  const classes = useStyles();

  const [state, setState] = useState({
    data: {
      name: "",
      email: "",
      password: "",
    },
  });
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);

  //   const { handleUserChange } = props;

  const handleInputChange = (event) => {
    const values = { ...state };
    values.data[event.target.name] = event.target.value;
    setState(values);
  };

  const handleSumbit = async () => {
    try {
      const { data } = state;
      setOpen(true);
      //   var response = await auth.login(
      //     data.username,
      //     data.password,
      //     data.domain
      //   );
      //   handleUserChange();
      window.location = "/";
    } catch (ex) {
      setOpen(false);
      if (ex.response && ex.response.status === 400) {
        const values = { ...errors };
        values.username = ex.response.data;
        setErrors(values);
      }
    }
  };

  return (
    <div className={classes.root}>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid
        container
        className={classes.formContainer}
        spacing={3}
        direction="column"
      >
        <Grid item>
          <Typography variant="h4" className={classes.title}>
            Bug Tracker
          </Typography>
          <Typography variant="h6" className={classes.description}>
            Welcome To Bug Tracker
          </Typography>
        </Grid>
        <Grid item>
          <TextInput
            label=" Name"
            placeholder="Enter Your Full Name"
            value={state.data.name}
            name="name"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextInput
            label="Email Address"
            placeholder="Enter Email Address"
            value={state.data.email}
            name="email"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextInput
            label="Password"
            placeholder="Enter Password"
            type="password"
            value={state.data.password}
            name="password"
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleSumbit}
            disableRipple
          >
            Register
          </Button>
        </Grid>

        <Grid item>
          <LinkTag variant="h6" color="primary" component={Link} to="login">
            already have account? click here to login.
          </LinkTag>
        </Grid>
      </Grid>
      <a href="https://www.freepik.com/free-photos-vectors/business">
        Business vector created by pikisuperstar - www.freepik.com
      </a>
    </div>
  );
}
