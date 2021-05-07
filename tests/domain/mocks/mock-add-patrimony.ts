import { AddPatrimony } from '@/domain/usecases'
import { mockPatrimonyModel } from '@/tests/domain/mocks'

import faker from 'faker'

export const mockAddPatrimonyParams = (): AddPatrimony.Params => ({
  number: faker.datatype.number().toString(),
  brand: faker.random.word(),
  categoryId: faker.datatype.number(),
  ownerId: faker.datatype.number()
})

export class AddPatrimonySpy implements AddPatrimony {
  params: AddPatrimony.Params
  account = mockPatrimonyModel()
  callsCount = 0

  async add (params: AddPatrimony.Params): Promise<AddPatrimony.Model> {
    this.callsCount++
    this.params = params
    return this.account
  }
}
