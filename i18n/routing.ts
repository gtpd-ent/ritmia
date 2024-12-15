import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  defaultLocale: "en",
  locales: ["en", "es"],
});

export const { getPathname, Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
