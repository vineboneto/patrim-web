import { UpdatePatrimony } from '@/domain/usecases'
import { mockPatrimonyModel } from '@/tests/domain/mocks'

import faker from 'faker'

export const mockUpdatePatrimonyParams = (): UpdatePatrimony.Params => ({
  id: faker.datatype.number(),
  number: faker.datatype.number().toString(),
  brand: faker.random.word(),
  categoryId: faker.datatype.number(),
  ownerId: faker.datatype.number()
})

export class UpdatePatrimonySpy implements UpdatePatrimony {
  params: UpdatePatrimony.Params
  account = mockPatrimonyModel()
  callsCount = 0

  async update (params: UpdatePatrimony.Params): Promise<UpdatePatrimony.Model> {
    this.callsCount++
    this.params = params
    return this.account
  }
}
