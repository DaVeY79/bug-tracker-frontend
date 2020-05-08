import React from "react";
import { Provider } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";

import configureStore from "./store/configureStore";
import Routes from "./routes";
import Theme from "./theme";
import Header from "./components/Header";

const store = configureStore();

function App() {
  const applyTheme = createMuiTheme(Theme);
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={applyTheme}>
        <Grid container>
          <Grid item xs={12}>
            <Header />
          </Grid>
          <Grid item xs={12} style={{ padding: 20 }}>
            <Routes />
          </Grid>
        </Grid>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
