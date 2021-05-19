import { DeletePatrimony } from '@/domain/usecases'
import { mockPatrimonyModel } from '@/tests/domain/mocks'

import faker from 'faker'

export const mockDeletePatrimonyParams = (): DeletePatrimony.Params => ({
  id: faker.datatype.number()
})

export class DeletePatrimonySpy implements DeletePatrimony {
  params: DeletePatrimony.Params
  model = mockPatrimonyModel()
  callsCount = 0

  async delete (params: DeletePatrimony.Params): Promise<DeletePatrimony.Model> {
    this.callsCount++
    this.params = params
    return this.model
  }
}
