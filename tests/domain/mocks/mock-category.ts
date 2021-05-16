import { CategoryModel } from '@/domain/models'

import faker from 'faker'

export const mockCategoryModel = (): CategoryModel => ({
  id: faker.datatype.number(),
  name: faker.name.findName()
})

export const mockCategoriesModel = (): CategoryModel[] => ([
  {
    id: 1,
    name: 'Impressora'
  }, {
    id: 2,
    name: 'Computador'
  }, {
    id: 3,
    name: 'Telefone'
  }
])
