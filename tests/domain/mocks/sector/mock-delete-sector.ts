import { DeleteSector } from '@/domain/usecases'

import faker from 'faker'

export const mockDeleteSectorParams = (): DeleteSector.Params => ({
  id: faker.datatype.number()
})
