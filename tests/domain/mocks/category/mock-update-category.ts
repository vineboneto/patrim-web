import { UpdateCategory } from '@/domain/usecases'
import { mockCategoryModel } from '@/tests/domain/mocks'

import faker from 'faker'

export const mockUpdateCategoryParams = (): UpdateCategory.Params => ({
  id: faker.datatype.number(),
  name: faker.name.findName()
})

export class UpdateCategorySpy implements UpdateCategory {
  params: UpdateCategory.Params
  model = mockCategoryModel()
  callsCount = 0

  async update (params: UpdateCategory.Params): Promise<UpdateCategory.Model> {
    this.callsCount++
    this.params = params
    return this.model
  }
}
