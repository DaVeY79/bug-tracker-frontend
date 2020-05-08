import React, { useEffect, useState, useRef } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 120,
    // maxWidth: 300,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelect(props) {
  const classes = useStyles();

  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const { label, value, items, handleChange, name } = props;

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl} fullWidth>
        <InputLabel ref={inputLabel} id="demo-mutiple-checkbox-label">
          {label}
        </InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={value}
          defaultValue={value}
          name={name}
          onChange={handleChange}
          input={<Input labelWidth={labelWidth} />}
          renderValue={(selected) =>
            selected.map(
              (item) => `${items.filter((itm) => itm.id === item)[0].name}, `
            )
          }
          MenuProps={MenuProps}
        >
          {items.map((item, index) => (
            <MenuItem key={index} value={item.id}>
              <Checkbox checked={value.indexOf(item.id) > -1} color="primary" />
              <ListItemText primary={item.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
