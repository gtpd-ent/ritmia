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

export const getSavedTracks = createAsyncThunk(
  "user/getSavedTracks",
  async (_, { rejectWithValue }) => {
    let savedTracks: Track[] = [];
    const LIMIT = 50;

    try {
      const firstResponse = await api.get(`/me/tracks?limit=${LIMIT}`);
      const { items, next, total } = firstResponse.data;

      savedTracks = items;

      if (!next) {
        return { items: savedTracks, total };
      }

      const remaining = total - LIMIT;
      if (remaining <= 0) {
        return { items: savedTracks, total };
      }

      const callsNeeded = Math.ceil(remaining / LIMIT);
      const promises = [];

      for (let i = 1; i <= callsNeeded; i++) {
        const offset = i * LIMIT;
        const url = `/me/tracks?limit=${LIMIT}&offset=${offset}`;
        promises.push(api.get(url));
      }

      const responses = await Promise.all(promises);

      for (const response of responses) {
        savedTracks = savedTracks.concat(response.data.items);
      }

      return { items: savedTracks, total };
    } catch (error: any) {
      const errorMsg = error.response.data.error.message;
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
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
        description:
          "A playlist created by Ritmia, the music app that merges your favourite songs to match the vibe you were looking for.",
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

type AddCoverImageProps = {
  image: string;
  playlistId: string;
};

export const addCoverImage = createAsyncThunk(
  "user/addCoverImage",
  async ({ image, playlistId }: AddCoverImageProps, { rejectWithValue }) => {
    try {
      const response = await api.put(`/playlists/${playlistId}/images`, image, {
        headers: { "Content-Type": "image/jpeg" },
      });
      return response.data;
    } catch (error: any) {
      const errorMsg = error.response.data.error.message;
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  },
);
