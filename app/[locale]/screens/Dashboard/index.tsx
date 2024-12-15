import React, { useRef, useState } from "react";

import GTUser from "@/app/[locale]/components/GTUser";

import Artists from "./components/Artists";
import Tracks from "./components/Tracks";

const Dashboard = () => {
  const [selectedArtists, setSelectedArtists] = useState<
    { id: string; name: string }[]
  >([]);

  const hasFetchedArtists = useRef(false);
  const hasFetchedTracks = useRef(false);
  return (
    <div className="flex h-dvh flex-col items-center gap-8 overflow-y-scroll px-8 pb-8 pt-32">
      <GTUser />
      <h1 className="pb-4 text-5xl italic">Ritmia</h1>
      <Artists
        {...{
          hasFetchedArtists,
          selectedArtists,
          setSelectedArtists,
        }}
      />
      <Tracks {...{ hasFetchedTracks, selectedArtists }} />
    </div>
  );
};

export default Dashboard;
