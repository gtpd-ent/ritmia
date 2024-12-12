import { Track } from "@/types";

export const getImages = (tracks: Track[]) => {
  const images = tracks.map(({ track }) => track.album.images[0].url);
  const uniqueImages = [...new Set(images)];
  return uniqueImages.length >= 4
    ? uniqueImages.slice(0, 4)
    : [uniqueImages[0]];
};
