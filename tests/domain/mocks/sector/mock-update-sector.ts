import { UpdateSector } from '@/domain/usecases'

import faker from 'faker'

export const mockUpdateSectorParams = (): UpdateSector.Params => ({
  id: faker.datatype.number(),
  name: faker.name.findName()
})
