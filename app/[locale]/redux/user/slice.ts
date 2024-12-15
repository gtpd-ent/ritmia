import { createSlice } from "@reduxjs/toolkit";

import { Artist, Playlist, Track, UserProfile } from "@/types";

import { handleAsyncActions } from "../utils";

import {
  addCoverImage,
  addTracksToPlaylist,
  createPlaylist,
  getFollowedArtists,
  getProfile,
  getSavedTracks,
} from "./thunk";

interface UserState {
  addCoverImage: { snapshot_id: string } | {};
  addCoverImageError: string | null;
  addCoverImageLoading: boolean;
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
  addCoverImage: {},
  addCoverImageError: null,
  addCoverImageLoading: false,
  addTracksToPlaylist: {},
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
    handleAsyncActions<UserState>(builder, addCoverImage, "addCoverImage");
  },
  initialState,
  name: "user",
  reducers: {},
});

export default user.reducer;
