import { DeleteSector } from '@/domain/usecases'
import { mockSectorModel } from '@/tests/domain/mocks'

import faker from 'faker'

export const mockDeleteSectorParams = (): DeleteSector.Params => ({
  id: faker.datatype.number()
})

export class DeleteSectorSpy implements DeleteSector {
  params: DeleteSector.Params
  model = mockSectorModel()
  callsCount = 0

  async delete (params: DeleteSector.Params): Promise<DeleteSector.Model> {
    this.callsCount++
    this.params = params
    return this.model
  }
}
