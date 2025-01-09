"use client";

import React, { useEffect, useState } from "react";

import Dashboard from "./screens/Dashboard";
import { getAccessToken } from "./redux/auth/thunk";
import { getProfile } from "./redux/user/thunk";
import Welcome from "./screens/Welcome";
import { t_useDispatch, t_useSelector } from "./hooks";

const Ritmia = () => {
  const authenticated = t_useSelector((state) => state.auth.authenticated);

  const dispatch = t_useDispatch();

  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (code) {
      dispatch(getAccessToken(code));
    }
    setAppLoading(false);
  }, [dispatch]);

  useEffect(() => {
    if (authenticated) {
      dispatch(getProfile());
    }
  }, [authenticated, dispatch]);

  return (
    <main className="flex max-w-screen-lg flex-col items-center">
      {!authenticated ? (
        <Welcome {...{ showLoading: appLoading }} />
      ) : (
        <Dashboard />
      )}
    </main>
  );
};

export default Ritmia;
