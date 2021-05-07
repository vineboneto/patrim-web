import { LoadCategories } from '@/domain/usecases'
import { mockCategoriesModel } from '@/tests/domain/mocks'

export class LoadCategoriesSpy implements LoadCategories {
  data = mockCategoriesModel()
  callsCount = 0
  async load (): Promise<LoadCategories.Model[]> {
    this.callsCount++
    return this.data
  }
}
