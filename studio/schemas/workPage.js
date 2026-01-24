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
