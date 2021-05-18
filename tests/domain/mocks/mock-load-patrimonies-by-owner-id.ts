import { LoadPatrimoniesByOwnerId } from '@/domain/usecases'

import faker from 'faker'
import { mockPatrimoniesModel } from './mock-patrimony'

export const mockLoadPatrimoniesByOwnerIdParams = (): LoadPatrimoniesByOwnerId.Params => ({
  id: faker.datatype.number(),
  skip: 0,
  take: 9
})

export class LoadPatrimoniesByOwnerIdSpy implements LoadPatrimoniesByOwnerId {
  callsCount = 0
  params: LoadPatrimoniesByOwnerId.Params
  data = {
    model: mockPatrimoniesModel(),
    count: mockPatrimoniesModel().length
  }

  async loadByOwnerId (params: LoadPatrimoniesByOwnerId.Params): Promise<LoadPatrimoniesByOwnerId.Model> {
    this.params = params
    this.callsCount++
    return this.data
  }
}
