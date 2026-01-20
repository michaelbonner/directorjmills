"use client";

import { useEffect } from "react";
import TagManager from "react-gtm-module";

export function GTMInitializer() {
  useEffect(() => {
    TagManager.initialize({ gtmId: "GTM-NQB4SLF" });
  }, []);

  return null;
}
