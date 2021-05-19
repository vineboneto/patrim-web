import { AddOwner } from '@/domain/usecases'

import faker from 'faker'

export const mockAddOwnerParams = (): AddOwner.Params => ({
  name: faker.name.findName(),
  sectorId: faker.datatype.number()
})
