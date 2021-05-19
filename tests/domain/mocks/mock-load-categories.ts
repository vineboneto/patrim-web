import { LoadCategories } from '@/domain/usecases'
import { mockCategoriesModel } from '@/tests/domain/mocks'

export const mockLoadCategoriesParams = (): LoadCategories.Params => ({
  skip: 0,
  take: 9
})

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
