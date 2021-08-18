import { MdLocalMovies as icon } from "react-icons/md";

export default {
  name: "workItem",
  title: "Work Items",
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
      name: "overview",
      title: "Overview",
      type: "blockContent",
    },
    {
      name: "poster",
      title: "Poster Image",
      type: "image",
      options: {
        hotspot: true,
      },
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
