import Image from "next/image";
import React from "react";

import { t_useSelector } from "@/app/[locale]/hooks";
import { UserProfile } from "@/types";

const GTUser = () => {
  const { display_name, images } = t_useSelector(
    (state) => state.user.profile as UserProfile,
  );
  return (
    display_name && (
      <div className="absolute right-8 top-8 flex items-center gap-3 rounded-full border border-white/10 bg-gray-900 p-2 pr-4">
        {images?.[0] && (
          <Image
            alt={display_name}
            className="size-8 rounded-full"
            height={32}
            src={images[0].url}
            unoptimized
            width={32}
          />
        )}
        {display_name}
      </div>
    )
  );
};

export default GTUser;
