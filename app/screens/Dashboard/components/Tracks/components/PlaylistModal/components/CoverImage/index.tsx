/* eslint-disable @next/next/no-img-element */
import { useToJpeg } from "@hugocxl/react-to-image";
import React, { Fragment, useEffect, useRef } from "react";

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

  const hasAddedCoverImage = useRef(false);
  const [state, convert, ref] = useToJpeg<HTMLDivElement>({
    onSuccess: (data) => {
      const image = data.replace("data:image/jpeg;base64,", "");
      dispatch(addCoverImage({ image, playlistId }));
    },
  });

  useEffect(() => {
    if (state.isIdle && !hasAddedCoverImage.current) {
      convert();
      hasAddedCoverImage.current = true;
    }
  }, [state, convert, hasAddedCoverImage]);

  return (
    <Fragment>
      <div
        className="relative flex size-[200px] items-center justify-center"
        ref={ref}
      >
        <div className="relative z-0 flex size-full flex-wrap items-center justify-center">
          {images.map((img, index) => (
            <img
              alt="cover"
              className={`${images.length === 1 ? "size-[200px]" : "size-[100px]"} object-cover`}
              crossOrigin="anonymous"
              key={index}
              src={img}
            />
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            alt="GTPD Logo"
            className="size-[200px] bg-gray-950/50 object-contain"
            height={200}
            src="/GTPDLogo.png"
            width={200}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default CoverImage;
