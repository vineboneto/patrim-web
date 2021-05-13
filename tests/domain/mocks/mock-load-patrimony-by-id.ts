import { LoadPatrimonyById } from '@/domain/usecases'
import { mockPatrimonyModel } from '@/tests/domain/mocks'

export class LoadPatrimonyByIdSpy implements LoadPatrimonyById {
  model = mockPatrimonyModel()
  params: LoadPatrimonyById.Params
  callsCount = 0

  async loadById (params: LoadPatrimonyById.Params): Promise<LoadPatrimonyById.Model> {
    this.callsCount++
    this.params = params
    return this.model
  }
}
