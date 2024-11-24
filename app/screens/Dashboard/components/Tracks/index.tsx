import { FaPlus, FaRegCircleXmark } from "react-icons/fa6";
import React, { useEffect, useState } from "react";

import { getSavedTracks } from "@/app/redux/user/thunk";
import GTLoading from "@/app/components/GTLoading";
import { t_useDispatch, t_useSelector } from "@/app/hooks";

import TrackItem from "./components/TrackItem";

type TracksProps = {
  selectedArtists: string[];
};

const Tracks = ({ selectedArtists }: TracksProps) => {
  const dispatch = t_useDispatch();
  const { savedTracks, savedTracksLoading } = t_useSelector(
    (state) => state.user,
  );
  const { items } = savedTracks;

  const [progress, setProgress] = useState(0);
  const [total, setTotal] = useState(0);

  const tracksToShow = items
    .filter(({ track }) =>
      track.artists.some(({ id }) => selectedArtists.includes(id)),
    )
    .sort(({ track: { name: a } }, { track: { name: b } }) =>
      a.localeCompare(b),
    );

  useEffect(() => {
    dispatch(getSavedTracks({ setProgress, setTotal }));
  }, [dispatch]);

  return (
    <GTLoading
      loading={savedTracksLoading}
      progress={progress}
      title="Loading tracks..."
      total={total}
    >
      <div className="flex w-full flex-col rounded-xl bg-gray-900/30">
        <button
          className="flex h-10 w-full items-center justify-center gap-1 rounded-t-xl bg-green-600/80 transition hover:bg-green-800 active:bg-green-800/80 disabled:bg-green-500/20 disabled:text-gray-400"
          disabled={tracksToShow.length <= 0}
        >
          <FaPlus size={12} />
          Create
        </button>
        {tracksToShow.length > 0 ? (
          <div className="h-[30rem] overflow-y-scroll">
            {tracksToShow.map((elem) => (
              <TrackItem key={elem.track.id} {...{ elem }} />
            ))}
          </div>
        ) : (
          <div className="flex h-60 flex-col items-center justify-center gap-4 text-gray-400">
            <FaRegCircleXmark size={32} />
            {selectedArtists.length > 0
              ? "No liked songs found from the selected artists"
              : "Select an artist to see your liked songs"}
          </div>
        )}
      </div>
    </GTLoading>
  );
};

export default Tracks;
