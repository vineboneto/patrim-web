import { LoadOwnerById } from '@/domain/usecases'
import { mockOwnerModel } from '@/tests/domain/mocks'

export class LoadOwnerByIdSpy implements LoadOwnerById {
  model = mockOwnerModel()
  params: LoadOwnerById.Params
  callsCount = 0

  async loadById (params: LoadOwnerById.Params): Promise<LoadOwnerById.Model> {
    this.callsCount++
    this.params = params
    return this.model
  }
}
