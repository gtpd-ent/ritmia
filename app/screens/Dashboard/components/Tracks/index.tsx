import React from "react";

import GTLoading from "@/app/components/GTLoading";
import { t_useSelector } from "@/app/hooks";

import TrackItem from "./components/TrackItem";

type TracksProps = {
  selectedArtists: string[];
};

const Tracks = ({ selectedArtists }: TracksProps) => {
  const { savedTracks, savedTracksLoading } = t_useSelector(
    (state) => state.user,
  );
  const { items } = savedTracks;

  const tracksToShow = items
    .filter(({ track }) =>
      track.artists.some(({ id }) => selectedArtists.includes(id)),
    )
    .sort(({ track: { name: a } }, { track: { name: b } }) =>
      a.localeCompare(b),
    );

  return (
    <GTLoading
      loading={savedTracksLoading}
      title="Loading tracks... this may take a while"
    >
      <div className="flex w-full flex-col gap-8">
        <h2 className="self-center text-2xl font-bold">
          Here&apos;s your new playlist!
        </h2>
        <div className="h-[30rem] overflow-y-scroll">
          {tracksToShow.map((elem) => (
            <TrackItem key={elem.track.id} {...{ elem }} />
          ))}
        </div>
      </div>
    </GTLoading>
  );
};

export default Tracks;
