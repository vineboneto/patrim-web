import { LoadOwners } from '@/domain/usecases'
import { mockOwnersModel } from '@/tests/domain/mocks'

export class LoadOwnersSpy implements LoadOwners {
  callsCount = 0
  data = {
    model: mockOwnersModel(),
    count: mockOwnersModel().length
  }

  async load (): Promise<LoadOwners.Model> {
    this.callsCount++
    return this.data
  }
}
