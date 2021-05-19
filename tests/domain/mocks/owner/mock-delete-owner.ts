import { DeleteOwner } from '@/domain/usecases'

import faker from 'faker'

export const mockDeleteOwnerParams = (): DeleteOwner.Params => ({
  id: faker.datatype.number()
})
