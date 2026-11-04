import {defineType, defineField} from 'sanity'
import {MdGridOn as icon} from 'react-icons/md'

export default defineType({
  name: 'workPage',
  title: 'Work Page',
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
      name: 'projectCountLabel',
      title: 'Project Count Label',
      type: 'string',
      description: 'Shown after the number of projects above the heading, e.g. "12 projects".',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'text',
      rows: 3,
      description: 'Short paragraph beside the heading.',
    }),
  ],
  preview: {
    select: {},
    prepare(selection) {
      return {
        title: `Work Page`,
      }
    },
  },
})
