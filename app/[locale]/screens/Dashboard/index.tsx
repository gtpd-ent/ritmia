import { Sarina } from "next/font/google";
import { useTranslations } from "use-intl";
import React, { useRef, useState } from "react";

import GTUser from "@/app/[locale]/components/GTUser";

import Artists from "./components/Artists";
import Footer from "./components/Footer";
import Tracks from "./components/Tracks";

const sarina = Sarina({ subsets: ["latin"], weight: "400" });

const Dashboard = () => {
  const t = useTranslations("Tracks");
  const [selectedArtists, setSelectedArtists] = useState<
    { id: string; name: string }[]
  >([]);

  const hasFetchedArtists = useRef(false);
  const hasFetchedTracks = useRef(false);
  return (
    <div className="flex h-dvh flex-col items-center gap-8 overflow-y-scroll px-8 pb-8 pt-32">
      <GTUser />
      <h1 className={`pb-4 text-5xl italic ${sarina.className}`}>Ritmia</h1>
      <Artists
        {...{
          hasFetchedArtists,
          selectedArtists,
          setSelectedArtists,
        }}
      />
      <p className="text-center text-gray-400">{t("Title")}</p>
      <Tracks {...{ hasFetchedTracks, selectedArtists }} />
      <Footer />
    </div>
  );
};

export default Dashboard;
