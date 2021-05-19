import { LoadPatrimonyByNumber } from '@/domain/usecases'
import { mockPatrimonyModel } from '@/tests/domain/mocks'

import faker from 'faker'

export const mockLoadPatrimonyByNumberParams = (): LoadPatrimonyByNumber.Params => ({
  number: faker.datatype.number().toString()
})

export class LoadPatrimonyByNumberSpy implements LoadPatrimonyByNumber {
  model = mockPatrimonyModel()
  params: LoadPatrimonyByNumber.Params
  callsCount = 0

  async loadByNumber (params: LoadPatrimonyByNumber.Params): Promise<LoadPatrimonyByNumber.Model> {
    this.callsCount++
    this.params = params
    return this.model
  }
}
