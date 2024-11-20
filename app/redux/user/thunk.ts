import { createAsyncThunk } from "@reduxjs/toolkit";
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

export const getFollowedArtists = createAsyncThunk(
  "user/getFollowedArtists",
  async (_, { rejectWithValue }) => {
    let followedArtists: Artist[] = [];
    let next = "/me/following?type=artist&limit=50";
    do {
      try {
        const response = await api.get(next);
        followedArtists = followedArtists.concat(response.data.artists.items);
        next = response.data.artists.next;
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
    let next = "/me/tracks?limit=50";
    do {
      try {
        const response = await api.get(next);
        savedTracks = savedTracks.concat(response.data.items);
        next = response.data.next;
      } catch (error: any) {
        const errorMsg = error.response.data.error.message;
        toast.error(errorMsg);
        return rejectWithValue(errorMsg);
      }
    } while (next);
    return { items: savedTracks, total: savedTracks.length };
  },
);
