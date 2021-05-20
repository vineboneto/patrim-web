import { AddSector } from '@/domain/usecases'
import { mockSectorModel } from '@/tests/domain/mocks'

import faker from 'faker'

export const mockAddSectorParams = (): AddSector.Params => ({
  name: faker.name.findName()
})

export class AddSectorSpy implements AddSector {
  params: AddSector.Params
  sector = mockSectorModel()
  callsCount = 0

  async add (params: AddSector.Params): Promise<AddSector.Model> {
    this.callsCount++
    this.params = params
    return this.sector
  }
}
