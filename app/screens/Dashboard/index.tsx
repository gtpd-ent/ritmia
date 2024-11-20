import React, { useState } from "react";

import GTLoading from "@/app/components/GTLoading";
import GTUser from "@/app/components/GTUser";
import { t_useSelector } from "@/app/hooks";

import Artists from "./components/Artists";
import Tracks from "./components/Tracks";

const Dashboard = () => {
  const profileLoading = t_useSelector((state) => state.user.profileLoading);
  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);

  return (
    <GTLoading loading={profileLoading} title="Loading profile...">
      <div className="flex h-dvh flex-col items-center gap-12 overflow-y-scroll px-8 pb-8 pt-32">
        <GTUser />
        <h1 className="text-5xl italic">Ritmia</h1>
        <Artists {...{ selectedArtists, setSelectedArtists }} />
        <Tracks {...{ selectedArtists }} />
      </div>
    </GTLoading>
  );
};

export default Dashboard;
