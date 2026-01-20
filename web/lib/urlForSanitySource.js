import { createImageUrlBuilder } from "@sanity/image-url";
import { getClient } from "../lib/sanity";

const urlForSanitySource = (source) => {
  return createImageUrlBuilder(getClient()).image(source);
};
export default urlForSanitySource;
