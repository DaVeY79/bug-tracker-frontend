import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";

import Theme from "../theme";

export default function withThemeProvider(Component) {
  return function WithThemeProvider() {
    const applyTheme = createMuiTheme(Theme);

    return (
      <MuiThemeProvider theme={applyTheme}>
        <Component />
      </MuiThemeProvider>
    );
  };
}
