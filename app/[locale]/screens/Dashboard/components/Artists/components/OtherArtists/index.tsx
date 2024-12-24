import groupBy from "lodash/groupBy";
import { useTranslations } from "next-intl";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import React, { Fragment, useState } from "react";

import { Artist } from "@/types";
import { t_useSelector } from "@/app/[locale]/hooks";

import { getDistinctArtists } from "./utils";

type OtherArtistsProps = {
  followedArtists: { items: Artist[] };
  handleSelectArtist: (id: string, name: string) => void;
  selectedArtists: { id: string; name: string }[];
};

const OtherArtists = ({
  followedArtists,
  handleSelectArtist,
  selectedArtists,
}: OtherArtistsProps) => {
  const t = useTranslations("Artists");
  const { savedTracks, savedTracksLoading } = t_useSelector(
    (state) => state.user,
  );

  const [open, setOpen] = useState(false);

  const otherArtists = getDistinctArtists(
    followedArtists.items,
    savedTracks.items,
  );
  const otherArtistsToShow = groupBy(otherArtists, (artist) =>
    selectedArtists.find((_artist) => _artist.id === artist.id)
      ? "selected"
      : "unselected",
  );

  const renderOtherArtists = (artists: Artist[]) =>
    artists.map(({ id, name }) => (
      <button
        className={`border border-white/10 ${selectedArtists.find((artist) => artist.id === id) ? "bg-green-900/70" : ""} rounded-lg p-2 text-xs text-gray-300/90`}
        key={id}
        onClick={() => handleSelectArtist(id, name)}
      >
        {name}
      </button>
    ));

  return (
    <Fragment>
      <div className="flex max-h-80 flex-wrap gap-1 overflow-y-scroll">
        {otherArtistsToShow.selected &&
          renderOtherArtists(otherArtistsToShow.selected)}
      </div>

      {!savedTracksLoading && (
        <Fragment>
          <button
            className="my-2 flex w-full items-center justify-center gap-2 text-green-500"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <FaAngleUp /> : <FaAngleDown />}
            {open ? t("ShowLess") : t("ShowMore")}
          </button>
          {open && (
            <Fragment>
              <p className="mb-2 w-full text-center text-gray-400">
                {t("OtherArtists")}
              </p>
              <div className="flex max-h-80 flex-wrap gap-1 overflow-y-scroll">
                {otherArtistsToShow.unselected &&
                  renderOtherArtists(otherArtistsToShow.unselected)}
              </div>
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default OtherArtists;
