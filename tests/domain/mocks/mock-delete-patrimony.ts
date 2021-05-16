import { DeletePatrimony } from '@/domain/usecases'

import faker from 'faker'

export const mockDeletePatrimonyParams = (): DeletePatrimony.Params => ({
  id: faker.datatype.number()
})
