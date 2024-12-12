"use client";

import { FaSpotify } from "react-icons/fa";
import Image from "next/image";
import React from "react";

import { redirectToAuth } from "@/app/utils/auth";
import { t_useSelector } from "@/app/hooks";

const Welcome = () => {
  const { loading } = t_useSelector(({ auth }) => ({
    loading: auth.accessTokenLoading,
  }));

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-center text-4xl font-bold">Welcome to Ritmia</h1>
      <button
        className="flex items-center gap-4 rounded-full border border-white/10 bg-green-900/75 px-4 py-2 text-xl font-light transition hover:scale-[1.15] focus:scale-[1.15] active:scale-105 disabled:scale-100 disabled:bg-gray-700"
        disabled={loading}
        onClick={redirectToAuth}
      >
        {loading ? (
          <div className="size-8 animate-spin rounded-full border-b-2 border-white" />
        ) : (
          <FaSpotify size={32} />
        )}
        {loading ? "Loading..." : "Login with Spotify"}
      </button>
      <div className="absolute bottom-[10%] flex flex-col items-center">
        <p className="text-center text-sm">A product by </p>
        <Image alt="GTPD" height={100} src="/GTPDLogo.png" width={100} />
      </div>
    </div>
  );
};

export default Welcome;
