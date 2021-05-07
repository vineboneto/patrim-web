import { LoadCategories } from '@/domain/usecases'

import faker from 'faker'

export const mockCategoryModel = (): LoadCategories.Model => ({
  id: faker.datatype.number(),
  name: faker.name.findName()
})

export const mockCategoriesModel = (): LoadCategories.Model[] => ([
  mockCategoryModel(),
  mockCategoryModel(),
  mockCategoryModel()
])
