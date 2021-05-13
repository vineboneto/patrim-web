import { PatrimonyModel } from '@/domain/models'

import faker from 'faker'

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
  },
  description: faker.random.words()
})

export const mockPatrimoniesModel = (): PatrimonyModel[] => ([
  mockPatrimonyModel(),
  mockPatrimonyModel(),
  mockPatrimonyModel()
])
