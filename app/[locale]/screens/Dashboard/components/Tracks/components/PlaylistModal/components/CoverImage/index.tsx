/* eslint-disable @next/next/no-img-element */
import html2canvas from "html2canvas";
import React, { Fragment, useEffect, useRef, useState } from "react";

import { addCoverImage } from "@/app/[locale]/redux/user/thunk";
import { Playlist } from "@/types";
import { t_useDispatch, t_useSelector } from "@/app/[locale]/hooks";

import { getHslColors } from "./utils";

type CoverImageProps = {
  hasAddedCoverImage: React.MutableRefObject<boolean>;
  selectedArtists: { id: string; name: string }[];
};

const CoverImage = ({
  hasAddedCoverImage,
  selectedArtists,
}: CoverImageProps) => {
  const dispatch = t_useDispatch();
  const { id: playlistId } = t_useSelector(
    (state) => state.user.createPlaylist as Playlist,
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const [loadedImage, setLoadedImage] = useState(false);

  useEffect(() => {
    if (!hasAddedCoverImage.current && containerRef.current && loadedImage) {
      html2canvas(containerRef.current, { useCORS: true }).then((canvas) => {
        const data = canvas.toDataURL("image/jpeg", 1);
        const image = data.replace("data:image/jpeg;base64,", "");
        dispatch(addCoverImage({ image, playlistId }));
        hasAddedCoverImage.current = true;
      });
    }

    return () => {
      hasAddedCoverImage.current = false;
    };
  }, [hasAddedCoverImage, loadedImage, dispatch, playlistId]);

  const [initialColor, finalColor] = getHslColors(
    selectedArtists.map(({ id }) => id),
  );

  return (
    <Fragment>
      <div
        className="relative flex size-[200px] items-center justify-center"
        ref={containerRef}
      >
        <div
          className="relative z-0 flex size-full flex-wrap items-center justify-center"
          style={{
            background: `linear-gradient(to top right, ${initialColor}, ${finalColor})`,
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            alt="GTPD Logo"
            className="size-[200px] bg-gray-950/50 object-contain"
            height={200}
            onLoad={async () => setLoadedImage(true)}
            src="/GTPDLogo.png"
            width={200}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default CoverImage;
