import { SectorModel } from '@/domain/models'

import faker from 'faker'

export const mockSectorModel = (): SectorModel => ({
  id: faker.datatype.number(),
  name: faker.name.findName()
})

export const mockSectorsModel = (): SectorModel[] => ([
  mockSectorModel(),
  mockSectorModel(),
  mockSectorModel(),
  mockSectorModel(),
  mockSectorModel(),
  mockSectorModel(),
  mockSectorModel(),
  mockSectorModel(),
  mockSectorModel(),
  mockSectorModel()
])
