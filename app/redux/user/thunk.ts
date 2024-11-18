import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import { api } from "@/app/api";

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
