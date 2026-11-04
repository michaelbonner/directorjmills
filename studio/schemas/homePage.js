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
    defineField({
      name: 'heroEyebrow',
      title: 'Hero Eyebrow',
      type: 'string',
      description: 'Small line above the main homepage heading.',
    }),
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      description: 'Main heading over the homepage video or image.',
    }),
    defineField({
      name: 'heroWorkLink',
      title: 'Hero Work Link',
      type: 'string',
    }),
    defineField({
      name: 'heroContactLink',
      title: 'Hero Contact Link',
      type: 'string',
    }),
    defineField({
      name: 'workEyebrow',
      title: 'Work Section Eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'workHeading',
      title: 'Work Section Heading',
      type: 'string',
    }),
    defineField({
      name: 'workLink',
      title: 'Work Section Link',
      type: 'string',
    }),
    defineField({
      name: 'contactEyebrow',
      title: 'Contact Section Eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'contactHeading',
      title: 'Contact Section Heading',
      type: 'string',
    }),
    defineField({
      name: 'contactLink',
      title: 'Contact Section Link',
      type: 'string',
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
