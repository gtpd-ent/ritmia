import Image from "next/image";
import React from "react";

import { Track } from "@/types";

type TrackItemProps = {
  elem: Track;
};

const TrackItem = ({ elem }: TrackItemProps) => {
  return (
    <div className="flex items-center gap-4 border border-x-0 border-t-0 border-b-gray-500/50 p-2">
      <Image
        alt={elem.track.album.name}
        className="size-8"
        height={32}
        src={elem.track.album.images[0].url}
        unoptimized
        width={32}
      />
      {elem.track.name}
    </div>
  );
};

export default TrackItem;
