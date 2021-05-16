import { LoadPatrimoniesByOwnerId } from '@/domain/usecases'

import faker from 'faker'

export const mockLoadPatrimoniesByOwnerIdParams = (): LoadPatrimoniesByOwnerId.Params => ({
  id: faker.datatype.number(),
  skip: 0,
  take: 9
})
