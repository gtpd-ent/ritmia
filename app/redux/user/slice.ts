import { createSlice } from "@reduxjs/toolkit";

import { UserProfile } from "@/types";

import { handleAsyncActions } from "../utils";

import { getProfile } from "./thunk";

interface UserState {
  profile: UserProfile | null;
  profileError: string | null;
  profileLoading: boolean;
}

const initialState = {
  profile: null,
  profileError: null,
  profileLoading: false,
};

const user = createSlice({
  extraReducers: (builder) => {
    handleAsyncActions<UserState>(builder, getProfile, "profile");
  },
  initialState,
  name: "user",
  reducers: {},
});

export default user.reducer;
