import { LoadOwners } from '@/domain/usecases'
import { mockOwnersModel } from '@/tests/domain/mocks'

export class LoadOwnersSpy implements LoadOwners {
  data = mockOwnersModel()
  callsCount = 0
  async load (): Promise<LoadOwners.Model[]> {
    this.callsCount++
    return this.data
  }
}
