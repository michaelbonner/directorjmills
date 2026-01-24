import {defineType, defineField} from 'sanity'
import {MdGridOn as icon} from 'react-icons/md'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon,
  fields: [
    defineField({
      name: 'seo_title',
      title: 'SEO Title',
      type: 'string',
    }),
    defineField({
      name: 'seo_description',
      title: 'SEO Description',
      type: 'string',
    }),
    defineField({
      name: 'poster',
      title: 'Poster',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'video_id',
      title: 'Video ID',
      type: 'string',
      description:
        'Enter the ID ( {{video_id}} ) of the video, not the whole url. https://player.vimeo.com/video/{{video_id}}?badge=0&autopause=0&player_id=0&app_id=58479',
    }),
  ],
  preview: {
    select: {},
    prepare(selection) {
      return {
        title: `Home Page`,
      }
    },
  },
})
