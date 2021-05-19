import { DeleteCategory } from '@/domain/usecases'

import faker from 'faker'

export const mockDeleteCategoryParams = (): DeleteCategory.Params => ({
  id: faker.datatype.number()
})
