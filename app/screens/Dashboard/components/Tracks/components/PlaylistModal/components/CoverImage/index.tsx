/* eslint-disable @next/next/no-img-element */
import html2canvas from "html2canvas";
import React, { Fragment, useEffect, useRef, useState } from "react";

import { addCoverImage } from "@/app/redux/user/thunk";
import { Playlist } from "@/types";
import { t_useDispatch, t_useSelector } from "@/app/hooks";

type CoverImageProps = {
  images: string[];
};

const CoverImage = ({ images }: CoverImageProps) => {
  const dispatch = t_useDispatch();
  const { id: playlistId } = t_useSelector(
    (state) => state.user.createPlaylist as Playlist,
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const hasAddedCoverImage = useRef(false);
  const [loadedImages, setLoadedImages] = useState(0);

  useEffect(() => {
    if (
      !hasAddedCoverImage.current &&
      containerRef.current &&
      loadedImages === images.length + 1
    ) {
      html2canvas(containerRef.current, { useCORS: true }).then((canvas) => {
        const data = canvas.toDataURL("image/jpeg", 0.5);
        const image = data.replace("data:image/jpeg;base64,", "");
        dispatch(addCoverImage({ image, playlistId }));
        hasAddedCoverImage.current = true;
      });
    }
  }, [hasAddedCoverImage, loadedImages, images.length, dispatch, playlistId]);

  return (
    <Fragment>
      <div
        className="relative flex size-[200px] items-center justify-center"
        ref={containerRef}
      >
        <div className="relative z-0 flex size-full flex-wrap items-center justify-center">
          {images.map((img, index) => (
            <img
              alt="cover"
              className={`${images.length === 1 ? "size-[200px]" : "size-[100px]"} object-cover`}
              crossOrigin="anonymous"
              key={index}
              onLoad={async () => setLoadedImages((prev) => prev + 1)}
              src={img}
            />
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            alt="GTPD Logo"
            className="size-[200px] bg-gray-950/50 object-contain"
            height={200}
            onLoad={async () => setLoadedImages((prev) => prev + 1)}
            src="/GTPDLogo.png"
            width={200}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default CoverImage;
