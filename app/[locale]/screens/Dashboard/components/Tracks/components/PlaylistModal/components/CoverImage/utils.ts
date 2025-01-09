import { createHash } from "crypto";

const stringToHsl = (str: string) => {
  const hash = createHash("md5").update(str).digest("hex");

  const hueSeed = parseInt(hash.substring(0, 2), 16);
  const hue = hueSeed % 360;

  const saturation = 60 + (parseInt(hash.substring(2, 4), 16) % 21); // 60-80
  const lightness = 45 + (parseInt(hash.substring(4, 6), 16) % 11); // 45-55

  return `hsl(${hue},${saturation}%,${lightness}%)`;
};

export const getHslColors = (arr: string[]) => {
  const sortedArr = [...arr].sort();

  const half = Math.ceil(sortedArr.length / 2);
  const first = sortedArr.slice(0, half).join("_");
  const second = sortedArr.slice(half).join("_");

  const initialColor = stringToHsl(first);
  const finalColor = second ? stringToHsl(second) : initialColor;
  return [initialColor, finalColor];
};
