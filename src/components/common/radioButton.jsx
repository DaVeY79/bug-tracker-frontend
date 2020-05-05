import React from "react";

import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  RadioBorder: {
    borderStyle: "solid",
    marginTop: 5,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#E4E8F0",
    PaddingLeft: 50,
    marginLeft: "0 !important",
    "& .MuiTypography-root": {
      paddingRight: "1em",
    },
  },
  checked: {
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: theme.palette.primary.main,
  },
}));

export default function RadioButtons(props) {
  const {
    formlabel,
    radiolabels,
    handleChange,
    inputProps,
    name,
    value,
  } = props;

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{formlabel}</FormLabel>
      <RadioGroup defaultValue={value} name="customized-radios" {...inputProps}>
        {radiolabels.map((label, index) => (
          <FormControlLabel
            key={index}
            value={label}
            label={label}
            name={name}
            onChange={handleChange}
            control={<Radio color="primary" />}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
