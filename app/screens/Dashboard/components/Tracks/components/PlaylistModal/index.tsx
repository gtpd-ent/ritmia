import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import React from "react";

import GTModal from "@/app/components/GTModal";
import { t_useSelector } from "@/app/hooks";
import { Playlist, Track } from "@/types";

import CoverImage from "./components/CoverImage";
import { getImages } from "./utils";

type PlaylistModalProps = {
  handleClose: () => void;
  open: boolean;
  tracks: Track[];
};

const PlaylistModal = ({ handleClose, open, tracks }: PlaylistModalProps) => {
  const { addTracksToPlaylistLoading, createPlaylistLoading } = t_useSelector(
    (state) => state.user,
  );
  const { external_urls, name } = t_useSelector(
    (state) => state.user.createPlaylist as Playlist,
  );

  const trackImages = getImages(tracks);

  return (
    <GTModal
      loading={createPlaylistLoading || addTracksToPlaylistLoading}
      onClose={handleClose}
      open={open}
    >
      <div className="flex flex-col items-center gap-4 px-6 pb-4 text-center">
        <p className="text-xl">Your playlist is ready!</p>
        {open && <CoverImage images={trackImages} />}
        <h1 className="text-2xl">&quot;{name}&quot;</h1>
        <a
          className="flex items-center gap-2 rounded-full border bg-green-700 px-6 py-2 text-xl text-white transition-all hover:scale-110 active:scale-95"
          href={external_urls?.spotify}
          rel="noreferrer"
          target="_blank"
        >
          Listen now
          <FaArrowUpRightFromSquare className="mt-px" size={16} />
        </a>
      </div>
    </GTModal>
  );
};

export default PlaylistModal;
