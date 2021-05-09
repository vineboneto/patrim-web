import { OwnerModel } from '@/domain/models'
import { mockSectorModel } from '@/tests/domain/mocks'

import faker from 'faker'

export const mockOwnerModel = (): OwnerModel => ({
  id: faker.datatype.number(),
  name: faker.name.findName(),
  sector: mockSectorModel()
})

export const mockOwnersModel = (): OwnerModel[] => ([
  {
    id: 1,
    name: faker.name.findName(),
    sector: mockSectorModel()
  }, {
    id: 2,
    name: faker.name.findName(),
    sector: mockSectorModel()
  }, {
    id: 3,
    name: faker.name.findName(),
    sector: mockSectorModel()
  }
])
