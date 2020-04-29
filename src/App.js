import React from "react";
import { Provider } from "react-redux";

import configureStore from "./store/configureStore";
import Bugs from "./components/Bugs";
import AddBugs from "./components/AddBugs";
import { Grid } from "@material-ui/core";

const store = configureStore();

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <header className="App-header">Bug Tracker</header>
          </Grid>
          <Grid item xs={12}>
            <AddBugs />
          </Grid>
          <Grid item xs={12}>
            <Bugs />
          </Grid>
        </Grid>
      </Provider>
    </div>
  );
}

export default App;
