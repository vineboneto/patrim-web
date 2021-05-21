import { UpdateOwner } from '@/domain/usecases'
import { mockOwnerModel } from '@/tests/domain/mocks'

import faker from 'faker'

export const mockUpdateOwnerParams = (): UpdateOwner.Params => ({
  id: faker.datatype.number(),
  name: faker.name.findName(),
  sectorId: faker.datatype.number()
})

export class UpdateOwnerSpy implements UpdateOwner {
  params: UpdateOwner.Params
  model = mockOwnerModel()
  callsCount = 0

  async update (params: UpdateOwner.Params): Promise<UpdateOwner.Model> {
    this.callsCount++
    this.params = params
    return this.model
  }
}
