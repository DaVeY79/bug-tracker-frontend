import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    // height: 7
  },
  formControl: {
    // margin: 0,
    fullWidth: true,
    display: "flex",
    // wrap: "nowrap"
  },

  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SelectInput(props) {
  const classes = useStyles();

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const { label, name, items, value, handleChange, errors } = props;

  return (
    <div>
      <FormControl
        variant="outlined"
        {...props}
        className={classes.formControl}
        error={errors ? true : false}
      >
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
          {label}
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          autoWidth={true}
          value={value}
          name={name}
          onChange={handleChange}
          labelWidth={labelWidth}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {items.map((item, index) => (
            <MenuItem key={index} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
        {errors ? <FormHelperText>{errors}</FormHelperText> : ""}
      </FormControl>
    </div>
  );
}
