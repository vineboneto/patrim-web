import { LoadCategories } from '@/domain/usecases'

import faker from 'faker'

export const mockCategoryModel = (): LoadCategories.Model => ({
  id: faker.datatype.number(),
  name: faker.name.findName()
})

export const mockCategoriesModel = (): LoadCategories.Model[] => ([
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
