import { MdPhotoLibrary as icon } from "react-icons/md";
import assetSources from "../parts/assetSources";

export default {
  name: "stillsPage",
  title: "Stills Page",
  type: "document",
  icon,
  fields: [
    {
      name: "isEnabled",
      title: "Is Enabled",
      type: "boolean",
    },
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 100,
      },
    },
    {
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
    },
    {
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
    },
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
            sources: assetSources,
          },
          fields: [
            {
              name: "caption",
              type: "string",
              title: "Caption",
              options: {
                isHighlighted: true,
              },
            },
          ],
        },
      ],
      options: {
        layout: "grid",
      },
    },
  ],
  preview: {
    select: {},
    prepare(selection) {
      return {
        title: `Stills Page`,
      };
    },
  },
};
