import { createSlice } from "@reduxjs/toolkit";

import { Artist, Track, UserProfile } from "@/types";

import { handleAsyncActions } from "../utils";

import { getFollowedArtists, getProfile, getSavedTracks } from "./thunk";

interface UserState {
  followedArtists: { items: Artist[]; total: number };
  followedArtistsError: string | null;
  followedArtistsLoading: boolean;
  profile: UserProfile | {};
  profileError: string | null;
  profileLoading: boolean;
  savedTracks: { items: Track[]; total: number };
  savedTracksError: string | null;
  savedTracksLoading: boolean;
}

const initialState: UserState = {
  followedArtists: { items: [], total: 0 },
  followedArtistsError: null,
  followedArtistsLoading: false,
  profile: {},
  profileError: null,
  profileLoading: false,
  savedTracks: { items: [], total: 0 },
  savedTracksError: null,
  savedTracksLoading: false,
};

const user = createSlice({
  extraReducers: (builder) => {
    handleAsyncActions<UserState>(builder, getProfile, "profile");
    handleAsyncActions<UserState>(
      builder,
      getFollowedArtists,
      "followedArtists",
    );
    handleAsyncActions<UserState>(builder, getSavedTracks, "savedTracks");
  },
  initialState,
  name: "user",
  reducers: {},
});

export default user.reducer;
