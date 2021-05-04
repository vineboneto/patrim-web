import { AddPatrimony } from '@/domain/usecases'

import faker from 'faker'
import { PatrimonyModel } from '../models'

export const mockAddPatrimonyParams = (): AddPatrimony.Params => ({
  number: faker.datatype.number().toString(),
  brand: faker.random.word(),
  categoryId: faker.datatype.number(),
  ownerId: faker.datatype.number()
})

export const mockPatrimonyModel = (): PatrimonyModel => ({
  id: faker.datatype.number(),
  number: faker.datatype.number().toString(),
  brand: faker.random.word(),
  category: {
    id: faker.datatype.number(),
    name: faker.name.findName()
  },
  owner: {
    id: faker.datatype.number(),
    name: faker.name.findName(),
    sector: {
      id: faker.datatype.number(),
      name: faker.name.findName()
    }
  }
})
