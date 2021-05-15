import { LoadPatrimoniesByNumber } from '@/domain/usecases'

import faker from 'faker'

export const mockLoadPatrimoniesByNumberParams = (): LoadPatrimoniesByNumber.Params => ({
  number: faker.datatype.number().toString()
})
