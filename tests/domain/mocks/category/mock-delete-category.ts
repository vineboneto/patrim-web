import { DeleteCategory } from '@/domain/usecases'
import { mockCategoryModel } from '@/tests/domain/mocks'

import faker from 'faker'

export const mockDeleteCategoryParams = (): DeleteCategory.Params => ({
  id: faker.datatype.number()
})

export class DeleteCategorySpy implements DeleteCategory {
  params: DeleteCategory.Params
  model = mockCategoryModel()
  callsCount = 0

  async delete (params: DeleteCategory.Params): Promise<DeleteCategory.Model> {
    this.callsCount++
    this.params = params
    return this.model
  }
}
