import { UpdateSector } from '@/domain/usecases'
import { mockSectorModel } from '@/tests/domain/mocks'

import faker from 'faker'

export const mockUpdateSectorParams = (): UpdateSector.Params => ({
  id: faker.datatype.number(),
  name: faker.name.findName()
})

export class UpdateSectorSpy implements UpdateSector {
  params: UpdateSector.Params
  model = mockSectorModel()
  callsCount = 0

  async update (params: UpdateSector.Params): Promise<UpdateSector.Model> {
    this.callsCount++
    this.params = params
    return this.model
  }
}
