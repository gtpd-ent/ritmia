import { createSlice } from "@reduxjs/toolkit";

import { Artist, Playlist, Track, UserProfile } from "@/types";

import { handleAsyncActions } from "../utils";

import {
  addTracksToPlaylist,
  createPlaylist,
  getFollowedArtists,
  getProfile,
  getSavedTracks,
} from "./thunk";

interface UserState {
  addTracksToPlaylist: { snapshot_id: string } | {};
  addTracksToPlaylistError: string | null;
  addTracksToPlaylistLoading: boolean;
  createPlaylist: Playlist | {};
  createPlaylistError: string | null;
  createPlaylistLoading: boolean;
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
  addTracksToPlaylist: {}, // The token is included here only because the action generator requires it as a target. It won't be used directly in the app state.
  addTracksToPlaylistError: null,
  addTracksToPlaylistLoading: false,
  createPlaylist: {},
  createPlaylistError: null,
  createPlaylistLoading: false,
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
    handleAsyncActions<UserState>(builder, createPlaylist, "createPlaylist");
    handleAsyncActions<UserState>(
      builder,
      addTracksToPlaylist,
      "addTracksToPlaylist",
    );
  },
  initialState,
  name: "user",
  reducers: {},
});

export default user.reducer;
