/* eslint-disable @next/next/no-img-element */
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { useTranslations } from "next-intl";
import React, { useRef } from "react";

import GTModal from "@/app/[locale]/components/GTModal";
import { Playlist } from "@/types";
import { t_useSelector } from "@/app/[locale]/hooks";

import CoverImage from "./components/CoverImage";

type PlaylistModalProps = {
  handleClose: () => void;
  open: boolean;
  selectedArtists: { id: string; name: string }[];
};

const PlaylistModal = ({
  handleClose,
  open,
  selectedArtists,
}: PlaylistModalProps) => {
  const t = useTranslations("Tracks");
  const {
    addCoverImageLoading,
    addTracksToPlaylistLoading,
    createPlaylistLoading,
  } = t_useSelector((state) => state.user);
  const { external_urls, name } = t_useSelector(
    (state) => state.user.createPlaylist as Playlist,
  );

  const hasAddedCoverImage = useRef(false);

  const loading =
    createPlaylistLoading ||
    addTracksToPlaylistLoading ||
    addCoverImageLoading ||
    !hasAddedCoverImage.current;

  return (
    <GTModal
      loading={createPlaylistLoading || addTracksToPlaylistLoading}
      onClose={handleClose}
      open={open}
    >
      <div className="flex flex-col items-center gap-4 px-6 pb-4 text-center">
        <p className="text-xl">{t("PlaylistReady")}</p>
        {open && (
          <CoverImage
            hasAddedCoverImage={hasAddedCoverImage}
            selectedArtists={selectedArtists}
          />
        )}
        <h1 className="text-2xl">&quot;{name}&quot;</h1>
        <a
          className={`flex items-center justify-center gap-2 rounded-full border bg-green-700 px-6 py-2 text-xl text-white transition-all ${loading ? "pointer-events-none opacity-60" : "hover:scale-110 active:scale-95"}`}
          href={external_urls?.spotify}
          rel="noreferrer"
          target="_blank"
        >
          {t("ListenHere")}
          {loading ? (
            <div className="size-4 animate-spin rounded-full border-b-2 border-white" />
          ) : (
            <FaArrowUpRightFromSquare className="mt-px" size={16} />
          )}
        </a>
        <a
          className="transition-all hover:scale-110 active:scale-95"
          href="https://cafecito.app/gtpd"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img
            alt="Invitame un café en cafecito.app"
            src="https://cdn.cafecito.app/imgs/buttons/button_4.png"
            srcSet="https://cdn.cafecito.app/imgs/buttons/button_4.png 1x, https://cdn.cafecito.app/imgs/buttons/button_4_2x.png 2x, https://cdn.cafecito.app/imgs/buttons/button_4_3.75x.png 3.75x"
          />
        </a>
      </div>
    </GTModal>
  );
};

export default PlaylistModal;
