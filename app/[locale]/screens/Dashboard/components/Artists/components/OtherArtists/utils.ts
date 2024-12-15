import { Artist, Track } from "@/types";

export const getDistinctArtists = (artists: Artist[], tracks: Track[]) => {
  const artistsMap = new Map<string, Artist>();

  for (const item of tracks) {
    for (const artist of item.track.artists) {
      if (artist.name && !artists.find((a) => a.id === artist.id)) {
        if (artistsMap.has(artist.id)) {
          artistsMap.get(artist.id)!.popularity += 1;
        } else {
          artistsMap.set(artist.id, { ...artist, popularity: 1 });
        }
      }
    }
  }

  return Array.from(artistsMap.values()).sort(
    (a, b) => b.popularity - a.popularity,
  );
};
