import React from "react";
import Alert from "@material-ui/lab/Alert";

const Toast = () => {
  return (
    <Alert variant="filled" severity="success">
      Successfully added bug
    </Alert>
  );
};

export default Toast;
