import React from "react";
import { Provider } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";

import configureStore from "./store/configureStore";
import Routes from "./routes";
import Theme from "./theme";

const store = configureStore();

function App() {
  const applyTheme = createMuiTheme(Theme);
  return (
    <div className="App">
      <Provider store={store}>
        <MuiThemeProvider theme={applyTheme}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <header className="App-header">
                <h1>Bug Tracker</h1>
              </header>
            </Grid>
            <Grid item xs={12}>
              <Routes />
            </Grid>
          </Grid>
        </MuiThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
