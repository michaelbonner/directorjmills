import { MdPerson as icon } from "react-icons/md";

export default {
  name: "aboutPage",
  title: "About Page",
  type: "document",
  icon,
  fields: [
    {
      name: "title",
      title: "Title",
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
      name: "seo_title",
      title: "SEO Title",
      type: "string",
    },
    {
      name: "seo_description",
      title: "SEO Description",
      type: "string",
    },
    {
      name: "photo",
      title: "Photo",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "bio",
      title: "Bio",
      type: "blockContent",
    },
    {
      name: "representation",
      title: "Representation",
      type: "blockContent",
    },
    {
      name: "notableAwards",
      title: "Notable Awards",
      type: "blockContent",
    },
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare(selection) {
      return {
        title: `${selection.title}`,
      };
    },
  },
};
