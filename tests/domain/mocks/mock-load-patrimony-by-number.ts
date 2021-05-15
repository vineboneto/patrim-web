import { LoadPatrimonyByNumber } from '@/domain/usecases'

import faker from 'faker'

export const mockLoadPatrimonyByNumberParams = (): LoadPatrimonyByNumber.Params => ({
  number: faker.datatype.number().toString()
})
