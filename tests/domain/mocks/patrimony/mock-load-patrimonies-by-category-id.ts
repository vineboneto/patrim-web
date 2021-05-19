import { LoadPatrimoniesByCategoryId } from '@/domain/usecases'
import { mockPatrimoniesModel } from '@/tests/domain/mocks'

import faker from 'faker'

export const mockLoadPatrimoniesByCategoryIdParams = (): LoadPatrimoniesByCategoryId.Params => ({
  id: faker.datatype.number(),
  skip: 0,
  take: 9
})

export class LoadPatrimoniesByCategoryIdSpy implements LoadPatrimoniesByCategoryId {
  callsCount = 0
  params: LoadPatrimoniesByCategoryId.Params
  data = {
    model: mockPatrimoniesModel(),
    count: mockPatrimoniesModel().length
  }

  async loadByCategoryId (params: LoadPatrimoniesByCategoryId.Params): Promise<LoadPatrimoniesByCategoryId.Model> {
    this.params = params
    this.callsCount++
    return this.data
  }
}
