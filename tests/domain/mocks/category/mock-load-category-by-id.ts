import { LoadCategoryById } from '@/domain/usecases'
import { mockCategoryModel } from '@/tests/domain/mocks'

export class LoadCategoryByIdSpy implements LoadCategoryById {
  model = mockCategoryModel()
  params: LoadCategoryById.Params
  callsCount = 0

  async loadById (params: LoadCategoryById.Params): Promise<LoadCategoryById.Model> {
    this.callsCount++
    this.params = params
    return this.model
  }
}
