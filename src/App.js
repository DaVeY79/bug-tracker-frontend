import React from "react";
import "./App.css";
import { Provider } from "react-redux";

import configureStore from "./store/configureStore";
import Bugs from "./components/Bugs";

const store = configureStore();

function App() {
  return (
    <div className="App">
      <header className="App-header">Bug Tracker</header>
      <Provider store={store}>
        <Bugs />
      </Provider>
    </div>
  );
}

export default App;
