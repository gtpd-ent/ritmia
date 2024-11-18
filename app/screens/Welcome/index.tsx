"use client";

import { FaSpotify } from "react-icons/fa";
import React from "react";

import { redirectToAuth } from "@/app/utils/auth";
import { t_useSelector } from "@/app/hooks";

const Welcome = () => {
  const { loading } = t_useSelector(({ auth }) => ({
    loading: auth.accessTokenLoading,
  }));

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-5xl font-bold">Welcome to Ritmia</h1>
      <button
        className="flex items-center gap-4 rounded-full border border-white/10 bg-slate-700 px-4 py-2 text-xl font-light"
        onClick={redirectToAuth}
      >
        <FaSpotify size={32} />
        {loading ? "Loading..." : "Login with Spotify"}
      </button>
    </div>
  );
};

export default Welcome;
