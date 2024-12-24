import { useTranslations } from "next-intl";
import { FaPlus, FaRegCircleXmark } from "react-icons/fa6";
import React, { useEffect, useState } from "react";

import GTLoading from "@/app/[locale]/components/GTLoading";
import { UserProfile } from "@/types";
import {
  addTracksToPlaylist,
  createPlaylist,
  getSavedTracks,
} from "@/app/[locale]/redux/user/thunk";
import { t_useDispatch, t_useSelector } from "@/app/[locale]/hooks";

import PlaylistModal from "./components/PlaylistModal";
import TrackItem from "./components/TrackItem";

type TracksProps = {
  hasFetchedTracks: React.MutableRefObject<boolean>;
  selectedArtists: { id: string; name: string }[];
};

const Tracks = ({ hasFetchedTracks, selectedArtists }: TracksProps) => {
  const t = useTranslations("Tracks");
  const dispatch = t_useDispatch();
  const { id: userId } = t_useSelector(
    (state) => state.user.profile as UserProfile,
  );
  const {
    addTracksToPlaylistError,
    createPlaylistError,
    savedTracks,
    savedTracksLoading,
  } = t_useSelector((state) => state.user);
  const { items } = savedTracks;

  const [open, setOpen] = useState(false);

  const tracksToShow = items
    .filter(({ track }) =>
      track.artists.some(({ id }) =>
        selectedArtists.find((artist) => artist.id === id),
      ),
    )
    .sort(({ track: { name: a } }, { track: { name: b } }) =>
      a.localeCompare(b),
    );

  useEffect(() => {
    if (hasFetchedTracks.current) return;
    hasFetchedTracks.current = true;
    dispatch(getSavedTracks());
  }, [dispatch, hasFetchedTracks]);

  const handleCreatePlaylist = async () => {
    setOpen(true);
    const artistsNames = selectedArtists.map(({ name }) => name).join(", ");
    const playlistName = `Ritmia - ${artistsNames}`;
    await dispatch(
      createPlaylist({
        callback: ({ id: playlistId }) => {
          const tracks = tracksToShow.map(({ track }) => track.uri);
          dispatch(addTracksToPlaylist({ playlistId, tracks }));
        },
        playlistName,
        userId,
      }),
    );
  };

  useEffect(() => {
    if (createPlaylistError || addTracksToPlaylistError) {
      setOpen(false);
    }
  }, [addTracksToPlaylistError, createPlaylistError]);

  return (
    <GTLoading loading={savedTracksLoading} title={t("Loading")}>
      <div className="flex w-full flex-col rounded-xl bg-gray-900/30">
        <button
          className="flex h-10 w-full items-center justify-center gap-1 rounded-t-xl bg-green-600/80 transition hover:bg-green-800 active:bg-green-800/80 disabled:bg-green-500/20 disabled:text-gray-400"
          disabled={tracksToShow.length <= 0}
          onClick={handleCreatePlaylist}
        >
          <FaPlus size={12} />
          {t("CreatePlaylist")}
        </button>
        {tracksToShow.length > 0 ? (
          <div className="h-[30rem] overflow-y-scroll">
            {tracksToShow.map((elem) => (
              <TrackItem key={elem.track.id} {...{ elem }} />
            ))}
          </div>
        ) : (
          <div className="flex h-60 flex-col items-center justify-center gap-4 px-4 text-center text-gray-400">
            <FaRegCircleXmark size={32} />
            {selectedArtists.length > 0 ? t("NoTracks") : t("NoArtists")}
          </div>
        )}
        <PlaylistModal
          handleClose={() => setOpen(false)}
          open={open}
          tracks={tracksToShow}
        />
      </div>
    </GTLoading>
  );
};

export default Tracks;
