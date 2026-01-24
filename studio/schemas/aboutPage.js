import {defineType, defineField} from 'sanity'
import {MdPerson as icon} from 'react-icons/md'

export default defineType({
  name: 'aboutPage',
  title: 'Contact Page',
  type: 'document',
  icon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 100,
      },
    }),
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
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'blockContent',
    }),
    defineField({
      name: 'bioMaxWidth',
      title: 'Bio Image Max Width',
      type: 'string',
      description: 'What is the maximum width of the image',
      options: {
        list: [
          {
            title: 'xs',
            value: 'xs',
          },
          {
            title: 'sm',
            value: 'sm',
          },
          {
            title: 'md',
            value: 'md',
          },
          {
            title: 'lg',
            value: 'lg',
          },
          {
            title: 'xl',
            value: 'xl',
          },
          {
            title: '2xl',
            value: '2xl',
          },
          {
            title: '3xl',
            value: '3xl',
          },
          {
            title: '4xl',
            value: '4xl',
          },
          {
            title: '5xl',
            value: '5xl',
          },
        ],
      },
    }),
    defineField({
      name: 'representation',
      title: 'Representation',
      type: 'blockContent',
    }),
    defineField({
      name: 'notableAwards',
      title: 'Notable Awards',
      type: 'blockContent',
    }),
    defineField({
      name: 'otherAwards',
      title: 'Other Awards',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      return {
        title: `${selection.title}`,
      }
    },
  },
})
