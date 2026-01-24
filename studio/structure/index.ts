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
            .documentId('92a0be0a-1074-4f29-b75e-b3bea3a46964')
        ),
      S.listItem()
        .title('Work Page')
        .icon(MdGridOn)
        .child(
          S.document()
            .schemaType('workPage')
            .documentId('225c1791-ccee-4a3c-8d40-df19fdb1cfaf')
        ),
      S.listItem()
        .title('Contact Page')
        .icon(MdPerson)
        .child(
          S.document()
            .schemaType('aboutPage')
            .documentId('c16f2166-ce88-40ca-b854-831fe432d4d9')
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
