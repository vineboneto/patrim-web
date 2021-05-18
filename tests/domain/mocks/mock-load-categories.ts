import { LoadCategories } from '@/domain/usecases'
import { mockCategoriesModel } from '@/tests/domain/mocks'

export class LoadCategoriesSpy implements LoadCategories {
  callsCount = 0
  data = {
    model: mockCategoriesModel(),
    count: mockCategoriesModel().length
  }

  async load (): Promise<LoadCategories.Model> {
    this.callsCount++
    return this.data
  }
}
