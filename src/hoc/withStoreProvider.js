import React from "react";
import { Provider } from "react-redux";

import configureStore from "../store/configureStore";

export default function withStoreProvider(Component) {
  return function WithStoreProvider() {
    const store = configureStore();
    return (
      <Provider store={store}>
        <Component />
      </Provider>
    );
  };
}
