import React from "react";
import { styled } from "@material-ui/core/styles";
import { compose, spacing, palette } from "@material-ui/system";

const Box = styled("div")(compose(spacing, palette));

const TextBox = ({ text, color, bgcolor }) => (
  <Box color={color || "grey"} bgcolor={bgcolor || "palevioletred"} p={1}>
    {text}
  </Box>
);

export default function Status({ bug }) {
  return (
    <div>
      {bug.resolved ? (
        <TextBox text="Completed" bgcolor="success.main" color="yellow" />
      ) : bug.userId ? (
        <TextBox text="Assigned" bgcolor="darkgrey" color="yellow" />
      ) : (
        <TextBox text="Pending..." bgcolor="white" color="error.main" />
      )}
    </div>
  );
}
