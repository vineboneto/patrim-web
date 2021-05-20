import { AddCategory } from '@/domain/usecases'
import { mockCategoryModel } from '@/tests/domain/mocks'

import faker from 'faker'

export const mockAddCategoryParams = (): AddCategory.Params => ({
  name: faker.name.findName()
})

export class AddCategorySpy implements AddCategory {
  params: AddCategory.Params
  category = mockCategoryModel()
  callsCount = 0

  async add (params: AddCategory.Params): Promise<AddCategory.Model> {
    this.callsCount++
    this.params = params
    return this.category
  }
}
