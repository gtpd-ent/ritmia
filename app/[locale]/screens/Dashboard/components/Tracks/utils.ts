const MAX_PLAYLIST_NAME_LENGTH = 100;

export const buildPlaylistName = (artistsNames: string[]) => {
  const baseTitle = "Ritmia - ";
  const suffixPlaceholder = "... (+XX more)";

  let nameList = "";
  let usedLength = baseTitle.length;
  let addedCount = 0;

  for (let i = 0; i < artistsNames.length; i++) {
    const isFirst = i === 0;
    const separator = isFirst ? "" : ", ";
    const nextName = artistsNames[i];

    const remainingSpace =
      MAX_PLAYLIST_NAME_LENGTH -
      usedLength -
      (i < artistsNames.length - 1 ? suffixPlaceholder.length : 0);

    const candidate = separator + nextName;

    if (candidate.length <= remainingSpace) {
      nameList += candidate;
      usedLength += candidate.length;
      addedCount++;
    } else {
      break;
    }
  }

  const leftover = artistsNames.length - addedCount;
  if (leftover > 0) {
    nameList += `... (+${leftover} more)`;
  }

  return baseTitle + nameList;
};
