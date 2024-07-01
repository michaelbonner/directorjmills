import groq from "groq";
import { sanityClient } from "../lib/sanity";

export const getIsStillsPageEnabled = async () => {
  const stillsPage = await sanityClient.fetch(
    groq`
        *[_type == "stillsPage" && slug.current == null][0]{
          isEnabled
        }
        `
  );
  return stillsPage?.isEnabled ?? false;
};
