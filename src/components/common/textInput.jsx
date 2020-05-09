import React, { Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  TextInput: {
    "& .MuiFormControl-marginNormal": {
      marginTop: 0,
    },
  },
}));

export default function TextInput(props) {
  const classes = useStyles();

  const { label, handleChange, value, name, errors } = props;
  return (
    <Fragment>
      <span className={classes.TextInput}>
        <TextField
          id="outlined-full-width"
          label={label}
          placeholder="Placeholder"
          error={errors ? true : false}
          helperText={errors}
          fullWidth
          margin="normal"
          onChange={handleChange}
          value={value}
          name={name}
          {...props}
          variant="outlined"
        />
      </span>
    </Fragment>
  );
}
