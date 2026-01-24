import {StructureResolver} from 'sanity/structure'
import {MdGridOn, MdPerson, MdPhotoLibrary, MdLocalMovies} from 'react-icons/md'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Singleton pages
      S.listItem()
        .title('Home Page')
        .icon(MdGridOn)
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
        ),
      S.listItem()
        .title('Work Page')
        .icon(MdGridOn)
        .child(
          S.document()
            .schemaType('workPage')
            .documentId('workPage')
        ),
      S.listItem()
        .title('Contact Page')
        .icon(MdPerson)
        .child(
          S.document()
            .schemaType('aboutPage')
            .documentId('aboutPage')
        ),
      S.listItem()
        .title('Stills Pages')
        .icon(MdPhotoLibrary)
        .child(
          S.documentTypeList('stillsPage')
            .title('Stills Pages')
        ),

      S.divider(),

      // Work Items with custom ordering
      S.listItem()
        .title('Work Items')
        .icon(MdLocalMovies)
        .child(
          S.documentTypeList('workItem')
            .title('Work Items')
            .defaultOrdering([{field: 'order', direction: 'asc'}])
            .canHandleIntent((_name, params) => params.type === 'workItem')
        ),
    ])
