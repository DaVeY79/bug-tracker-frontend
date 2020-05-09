import React from "react";
import Grid from "@material-ui/core/Grid";

import Routes from "./routes";
import Header from "./components/Header";
import withAuth from "./hoc/withAuth";
import withStore from "./hoc/withStoreProvider";
import withTheme from "./hoc/withThemeProvider";

function App() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={12} style={{ padding: 20 }}>
        <Routes />
      </Grid>
    </Grid>
  );
}

export default withStore(withTheme(withAuth(App)));
