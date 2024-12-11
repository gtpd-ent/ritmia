import { Track } from "@/types";

export const getImages = (tracks: Track[]) => {
  const images = tracks.map(({ track }) => track.album.images[0].url);
  return images.length >= 4 ? images.slice(0, 4) : [images[0]];
};
