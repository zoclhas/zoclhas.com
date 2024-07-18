"use server";

import { cookies } from "next/headers";

export const toggle = async () => {
  const cookie = cookies();
  const currentTheme = cookie.get("theme")?.value || "light";

  const forever = 24 * 60 * 60 * 1000 * 365;

  cookie.set("theme", currentTheme === "light" ? "dark" : "light", {
    expires: Date.now() + forever,
  });
};
