import { LoadSectorById } from '@/domain/usecases'
import { mockSectorModel } from '@/tests/domain/mocks'

export class LoadSectorByIdSpy implements LoadSectorById {
  model = mockSectorModel()
  params: LoadSectorById.Params
  callsCount = 0

  async loadById (params: LoadSectorById.Params): Promise<LoadSectorById.Model> {
    this.callsCount++
    this.params = params
    return this.model
  }
}
