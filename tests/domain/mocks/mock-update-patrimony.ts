import { UpdatePatrimony } from '@/domain/usecases'
import faker from 'faker'

export const mockUpdatePatrimonyParams = (): UpdatePatrimony.Params => ({
  id: faker.datatype.number(),
  number: faker.datatype.number().toString(),
  brand: faker.random.word(),
  categoryId: faker.datatype.number(),
  ownerId: faker.datatype.number()
})
