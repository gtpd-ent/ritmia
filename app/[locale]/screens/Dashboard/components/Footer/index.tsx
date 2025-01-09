import Image from "next/image";
import React from "react";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("Footer");
  return (
    <div className="flex items-center gap-2">
      <p>{t("PoweredBy")}</p>
      <Image alt="Spotify" height={80} src="/SpotifyLogo.svg" width={80} />
    </div>
  );
};

export default Footer;
