import { LoadPatrimoniesByCategoryId } from '@/domain/usecases'

import faker from 'faker'

export const mockLoadPatrimoniesByCategoryIdParams = (): LoadPatrimoniesByCategoryId.Params => ({
  id: faker.datatype.number(),
  skip: 0,
  take: 9
})
