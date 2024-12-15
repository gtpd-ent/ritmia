import { groupBy } from "lodash";
import Image from "next/image";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

import { Artist } from "@/types";
import { getFollowedArtists } from "@/app/[locale]/redux/user/thunk";
import GTLoading from "@/app/[locale]/components/GTLoading";
import { t_useDispatch, t_useSelector } from "@/app/[locale]/hooks";

import OtherArtists from "./components/OtherArtists";

type ArtistsProps = {
  hasFetchedArtists: React.MutableRefObject<boolean>;
  selectedArtists: { id: string; name: string }[];
  setSelectedArtists: React.Dispatch<
    React.SetStateAction<{ id: string; name: string }[]>
  >;
};

const Artists = ({
  hasFetchedArtists,
  selectedArtists,
  setSelectedArtists,
}: ArtistsProps) => {
  const t = useTranslations("Artists");
  const dispatch = t_useDispatch();
  const { followedArtists, followedArtistsLoading } = t_useSelector(
    (state) => state.user,
  );

  const [progress, setProgress] = useState(0);
  const [total, setTotal] = useState(0);

  const handleSelectArtist = (id: string, name: string) => {
    setSelectedArtists((prev) =>
      prev.find((artist) => artist.id === id)
        ? prev.filter((artist) => artist.id !== id)
        : [...prev, { id, name }],
    );
  };

  const artistsToShow = groupBy(followedArtists.items, (item) =>
    selectedArtists.find((artist) => artist.id === item.id)
      ? "selected"
      : "unselected",
  );

  const renderArtists = (artists: Artist[]) =>
    artists.map(({ id, images, name }) => (
      <button
        className={`flex items-center gap-3 rounded-full border border-white/10 ${selectedArtists.find((artist) => artist.id === id) ? "bg-green-900/70" : "bg-gray-900"} p-2 pr-4`}
        key={id}
        onClick={() => handleSelectArtist(id, name)}
      >
        {images.length > 0 && images[0]?.url && (
          <Image
            alt={name}
            className="size-8 rounded-full"
            height={32}
            src={images[0].url}
            width={32}
          />
        )}
        {name}
      </button>
    ));

  useEffect(() => {
    if (hasFetchedArtists.current) return;
    hasFetchedArtists.current = true;
    dispatch(getFollowedArtists({ setProgress, setTotal }));
  }, [dispatch, hasFetchedArtists]);

  return (
    <GTLoading
      loading={followedArtistsLoading}
      progress={progress}
      title={t("Loading")}
      total={total}
    >
      <div className="flex flex-wrap gap-2">
        {artistsToShow.selected && renderArtists(artistsToShow.selected)}
        {artistsToShow.unselected && renderArtists(artistsToShow.unselected)}
        <OtherArtists
          {...{ followedArtists, handleSelectArtist, selectedArtists }}
        />
      </div>
    </GTLoading>
  );
};

export default Artists;
