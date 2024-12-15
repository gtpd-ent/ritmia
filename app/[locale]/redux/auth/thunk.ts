import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import { authApi } from "@/app/[locale]/api";

export const getAccessToken = createAsyncThunk(
  "auth/getAccessToken",
  async (code: string, { rejectWithValue }) => {
    try {
      const verifier = localStorage.getItem("verifier");

      const params = new URLSearchParams();
      params.append("client_id", process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!);
      params.append("grant_type", "authorization_code");
      params.append("code", code);
      params.append(
        "redirect_uri",
        process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI!,
      );
      params.append("code_verifier", verifier!);

      const response = await authApi.post("/token", params, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      return response.data.access_token;
    } catch (error: any) {
      const errorMsg = error.response.data.error_description;
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  },
);
