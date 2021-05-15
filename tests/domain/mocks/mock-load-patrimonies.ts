import { LoadPatrimonies } from '@/domain/usecases'
import { mockPatrimoniesModel } from '@/tests/domain/mocks'

export class LoadPatrimoniesSpy implements LoadPatrimonies {
  model = mockPatrimoniesModel()
  callsCount = 0

  async load (): Promise<LoadPatrimonies.Model[]> {
    this.callsCount++
    return this.model
  }
}
