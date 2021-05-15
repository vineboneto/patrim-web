import { LoadPatrimonies } from '@/domain/usecases'
import { mockPatrimoniesModel } from '@/tests/domain/mocks'

export const mockLoadPatrimoniesParams = (): LoadPatrimonies.Params => ({
  skip: 0,
  take: 9
})

export class LoadPatrimoniesSpy implements LoadPatrimonies {
  model = mockPatrimoniesModel()
  callsCount = 0
  params: LoadPatrimonies.Params

  async load (params: LoadPatrimonies.Params): Promise<LoadPatrimonies.Model[]> {
    this.params = params
    this.callsCount++
    return this.model
  }
}
