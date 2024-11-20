import { groupBy } from "lodash";
import Image from "next/image";
import React from "react";

import { Artist } from "@/types";
import GTLoading from "@/app/components/GTLoading";
import { t_useSelector } from "@/app/hooks";

type ArtistsProps = {
  selectedArtists: string[];
  setSelectedArtists: React.Dispatch<React.SetStateAction<string[]>>;
};

const Artists = ({ selectedArtists, setSelectedArtists }: ArtistsProps) => {
  const { followedArtists, followedArtistsLoading } = t_useSelector(
    (state) => state.user,
  );
  const { items } = followedArtists;

  const handleSelectArtist = (id: string) => {
    setSelectedArtists((prev) =>
      prev.includes(id)
        ? prev.filter((artist) => artist !== id)
        : [...prev, id],
    );
  };

  const artistsToShow = groupBy(items, (item) =>
    selectedArtists.includes(item.id) ? "selected" : "unselected",
  );

  const renderArtists = (artists: Artist[]) =>
    artists.map(({ id, images, name }) => (
      <button
        className={`flex items-center gap-3 rounded-full border border-white/10 ${selectedArtists.includes(id) ? "bg-green-950/80" : "bg-gray-900"} p-2 pr-4`}
        key={id}
        onClick={() => handleSelectArtist(id)}
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

  return (
    <GTLoading loading={followedArtistsLoading} title="Loading artists...">
      <div className="flex flex-col gap-8">
        <h2 className="self-center text-2xl font-bold">
          Choose your favorite artists
        </h2>
        <div className="flex flex-wrap gap-2">
          {artistsToShow.selected && renderArtists(artistsToShow.selected)}
          {artistsToShow.unselected && renderArtists(artistsToShow.unselected)}
        </div>
      </div>
    </GTLoading>
  );
};

export default Artists;
