import { LoadPatrimonies } from '@/domain/usecases'
import { mockPatrimoniesModel } from '@/tests/domain/mocks'

export const mockLoadPatrimoniesParams = (): LoadPatrimonies.Params => ({
  skip: 0,
  take: 9
})

export class LoadPatrimoniesSpy implements LoadPatrimonies {
  callsCount = 0
  params: LoadPatrimonies.Params
  data = {
    model: mockPatrimoniesModel(),
    count: mockPatrimoniesModel().length
  }

  async load (params: LoadPatrimonies.Params): Promise<LoadPatrimonies.Model> {
    this.params = params
    this.callsCount++
    return this.data
  }
}
