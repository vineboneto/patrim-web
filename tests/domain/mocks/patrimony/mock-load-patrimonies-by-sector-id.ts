import { LoadPatrimoniesBySectorId } from '@/domain/usecases'
import { mockPatrimoniesModel } from '@/tests/domain/mocks'

import faker from 'faker'

export const mockLoadPatrimoniesBySectorIdParams = (): LoadPatrimoniesBySectorId.Params => ({
  id: faker.datatype.number(),
  skip: 0,
  take: 9
})

export class LoadPatrimoniesBySectorIdSpy implements LoadPatrimoniesBySectorId {
  callsCount = 0
  params: LoadPatrimoniesBySectorId.Params
  data = {
    model: mockPatrimoniesModel(),
    count: mockPatrimoniesModel().length
  }

  async loadBySectorId (params: LoadPatrimoniesBySectorId.Params): Promise<LoadPatrimoniesBySectorId.Model> {
    this.params = params
    this.callsCount++
    return this.data
  }
}
