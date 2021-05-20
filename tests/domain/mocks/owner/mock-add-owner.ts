import { AddOwner } from '@/domain/usecases'
import { mockOwnerModel } from '@/tests/domain/mocks'

import faker from 'faker'

export const mockAddOwnerParams = (): AddOwner.Params => ({
  name: faker.name.findName(),
  sectorId: faker.datatype.number()
})

export class AddOwnerSpy implements AddOwner {
  params: AddOwner.Params
  category = mockOwnerModel()
  callsCount = 0

  async add (params: AddOwner.Params): Promise<AddOwner.Model> {
    this.callsCount++
    this.params = params
    return this.category
  }
}
