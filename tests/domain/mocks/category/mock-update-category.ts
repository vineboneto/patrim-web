import { UpdateCategory } from '@/domain/usecases'

import faker from 'faker'

export const mockUpdateCategoryParams = (): UpdateCategory.Params => ({
  id: faker.datatype.number(),
  name: faker.name.findName()
})
