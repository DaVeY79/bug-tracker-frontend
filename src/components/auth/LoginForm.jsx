import React, { useState, useEffect } from "react";
// import { Redirect } from "react-router-dom";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormLabel from "@material-ui/core/FormLabel";
// import auth from "../../services/authService";

import backgroundImage from "../../assets/login_background.jpg";
import TextInput from "../common/textInput";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function LoginForm(props) {
  const classes = useStyles();

  const [state, setState] = useState({
    data: {
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
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        height: "100%",
      }}
    >
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid
        container
        style={{
          padding: 30,
          backgroundColor: "white",
          width: 350,
          alignSelf: "center",
          position: "absolute",
          marginLeft: "20%",
          marginTop: "5%",
          borderRadius: 15,
        }}
        spacing={3}
        direction="column"
      >
        <Grid
          item
          style={{
            fontSize: 20,
            fontWeight: "bold",
            paddingBottom: 0,
          }}
        >
          Bug Tracker
        </Grid>
        <Grid
          item
          style={{
            fontSize: 20,
            fontWeight: "bold",
            paddingTop: 0,
          }}
        >
          Welcome To Bug Tracker
        </Grid>
        <Grid item>
          <FormLabel>Name</FormLabel>
          <TextInput
            placeholder="Enter your Full Name"
            value={state.data.name}
            name="name"
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item>
          <FormLabel>Email Address</FormLabel>
          <TextInput
            placeholder="Enter Email Address"
            value={state.data.email}
            name="email"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <FormLabel>Password</FormLabel>
          <TextInput
            placeholder="Enter Password"
            type="password"
            value={state.data.password}
            name="password"
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item>
          <Button
            style={{ width: "100%", height: 45 }}
            variant="contained"
            color="primary"
            onClick={handleSumbit}
            disableRipple
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
