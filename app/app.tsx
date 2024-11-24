"use client";

import React, { useEffect } from "react";

import Dashboard from "./screens/Dashboard";
import { getAccessToken } from "./redux/auth/thunk";
import { getProfile } from "./redux/user/thunk";
import Welcome from "./screens/Welcome";
import { t_useDispatch, t_useSelector } from "./hooks";

const Ritmia = () => {
  const authenticated = t_useSelector((state) => state.auth.authenticated);

  const dispatch = t_useDispatch();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (code) {
      dispatch(getAccessToken(code));
    }
  }, [dispatch]);

  useEffect(() => {
    if (authenticated) {
      dispatch(getProfile());
    }
  }, [authenticated, dispatch]);

  return (
    <main className="flex flex-col items-center">
      {!authenticated ? <Welcome /> : <Dashboard />}
    </main>
  );
};

export default Ritmia;
