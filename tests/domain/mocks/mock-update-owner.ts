import { UpdateOwner } from '@/domain/usecases'

import faker from 'faker'

export const mockUpdateOwnerParams = (): UpdateOwner.Params => ({
  id: faker.datatype.number(),
  name: faker.name.findName(),
  sectorId: faker.datatype.number()
})
