import { createSlice } from "@reduxjs/toolkit";

import { handleAsyncActions } from "../utils";

import { getAccessToken } from "./thunk";

interface AuthState {
  accessToken: string | null;
  accessTokenLoading: boolean;
  accessTokenError: string | null;
  authenticated: boolean;
}

const initialState: AuthState = {
  accessToken: null, // The token is included here only because the action generator requires it as a target. It won't be used directly in the app state since the token is stored in localStorage.
  accessTokenError: null,
  accessTokenLoading: false,
  authenticated: false,
};

const auth = createSlice({
  extraReducers: (builder) => {
    handleAsyncActions<AuthState>(builder, getAccessToken, "accessToken", {
      fulfilled: (state, payload) => {
        state.authenticated = true;
        state.accessToken = null;
        localStorage.setItem("accessToken", payload);
      },
      rejected: (state) => {
        state.authenticated = false;
        localStorage.removeItem("accessToken");
      },
    });
  },
  initialState,
  name: "auth",
  reducers: {},
});

export default auth.reducer;
