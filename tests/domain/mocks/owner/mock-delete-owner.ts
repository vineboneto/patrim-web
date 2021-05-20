import { DeleteOwner } from '@/domain/usecases'
import { mockOwnerModel } from '@/tests/domain/mocks'

import faker from 'faker'

export const mockDeleteOwnerParams = (): DeleteOwner.Params => ({
  id: faker.datatype.number()
})

export class DeleteOwnerSpy implements DeleteOwner {
  params: DeleteOwner.Params
  model = mockOwnerModel()
  callsCount = 0

  async delete (params: DeleteOwner.Params): Promise<DeleteOwner.Model> {
    this.callsCount++
    this.params = params
    return this.model
  }
}
