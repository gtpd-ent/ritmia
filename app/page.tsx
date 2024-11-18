"use client";

import { Provider } from "react-redux";
import React from "react";

import Ritmia from "./app";
import store from "./redux/store";

const Providers = () => {
  return (
    <Provider store={store}>
      <Ritmia />
    </Provider>
  );
};

export default Providers;
