import { AddPatrimony } from '@/domain/usecases'

import faker from 'faker'

export const mockAddPatrimonyParams = (): AddPatrimony.Params => ({
  number: faker.datatype.number().toString(),
  brand: faker.random.word(),
  categoryId: faker.datatype.number(),
  ownerId: faker.datatype.number()
})
