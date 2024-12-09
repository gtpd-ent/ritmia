import { createAsyncThunk } from "@reduxjs/toolkit";
import React from "react";
import toast from "react-hot-toast";

import { api } from "@/app/api";
import { Artist, Track } from "@/types";

export const getProfile = createAsyncThunk(
  "user/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/me");
      return response.data;
    } catch (error: any) {
      const errorMsg = error.response.data.error.message;
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  },
);

type GetFollowedArtistsProps = {
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
};

export const getFollowedArtists = createAsyncThunk(
  "user/getFollowedArtists",
  async (
    { setProgress, setTotal }: GetFollowedArtistsProps,
    { rejectWithValue },
  ) => {
    let followedArtists: Artist[] = [];
    let next = "/me/following?type=artist&limit=50";
    do {
      try {
        const response = await api.get(next);
        followedArtists = followedArtists.concat(response.data.artists.items);
        next = response.data.artists.next;
        setProgress((prev) => Math.max(prev, followedArtists.length));
        setTotal(response.data.artists.total);
      } catch (error: any) {
        const errorMsg = error.response.data.error.message;
        toast.error(errorMsg);
        return rejectWithValue(errorMsg);
      }
    } while (next);
    return { items: followedArtists, total: followedArtists.length };
  },
);

type GetSavedTracksProps = {
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
};

export const getSavedTracks = createAsyncThunk(
  "user/getSavedTracks",
  async (
    { setProgress, setTotal }: GetSavedTracksProps,
    { rejectWithValue },
  ) => {
    let savedTracks: Track[] = [];
    let next = "/me/tracks?limit=50";
    do {
      try {
        const response = await api.get(next);
        savedTracks = savedTracks.concat(response.data.items);
        next = response.data.next;
        setProgress((prev) => Math.max(prev, savedTracks.length));
        setTotal(response.data.total);
      } catch (error: any) {
        const errorMsg = error.response.data.error.message;
        toast.error(errorMsg);
        return rejectWithValue(errorMsg);
      }
    } while (next);
    return { items: savedTracks, total: savedTracks.length };
  },
);

type CreatePlaylistProps = {
  callback?: (data: any) => void;
  playlistName: string;
  userId: string;
};

export const createPlaylist = createAsyncThunk(
  "user/createPlaylist",
  async (
    { callback, playlistName, userId }: CreatePlaylistProps,
    { rejectWithValue },
  ) => {
    try {
      const response = await api.post(`/users/${userId}/playlists`, {
        name: playlistName,
        public: true,
      });
      callback?.(response.data);
      return response.data;
    } catch (error: any) {
      const errorMsg = error.response.data.error.message;
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  },
);

type AddTracksToPlaylistProps = {
  playlistId: string;
  tracks: string[];
};

export const addTracksToPlaylist = createAsyncThunk(
  "user/addTracksToPlaylist",
  async (
    { playlistId, tracks }: AddTracksToPlaylistProps,
    { rejectWithValue },
  ) => {
    const chunkSize = 100; // Spotify API limit
    const uriChunks = [];

    for (let i = 0; i < tracks.length; i += chunkSize) {
      uriChunks.push(tracks.slice(i, i + chunkSize));
    }

    const addChunkToPlaylist = async (uris: string[]) => {
      try {
        await api.post(`/playlists/${playlistId}/tracks`, { uris });
      } catch (error: any) {
        const errorMsg = error.response.data.error.message;
        toast.error(errorMsg);
        return rejectWithValue(errorMsg);
      }
    };

    for (const chunk of uriChunks) {
      await addChunkToPlaylist(chunk);
    }
  },
);
