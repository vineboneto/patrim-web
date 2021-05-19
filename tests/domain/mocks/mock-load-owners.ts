import { LoadOwners } from '@/domain/usecases'
import { mockOwnersModel } from '@/tests/domain/mocks'

export const mockLoadOwnersParams = (): LoadOwners.Params => ({
  skip: 0,
  take: 9
})

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
