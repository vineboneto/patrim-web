import { CategoryModel } from '@/domain/models'

import faker from 'faker'

export const mockCategoryModel = (): CategoryModel => ({
  id: faker.datatype.number(),
  name: faker.name.findName()
})

export const mockCategoriesModel = (): CategoryModel[] => ([
  {
    id: 1,
    name: faker.name.findName()
  }, {
    id: 2,
    name: faker.name.findName()
  }, {
    id: 3,
    name: faker.name.findName()
  }
])
