import { CategoryModel } from '@/domain/models'

export interface LoadCategoryById {
  loadById (params: LoadCategoryById.Params): Promise<LoadCategoryById.Model>
}

export namespace LoadCategoryById {
  export type Params = {
    id: number
  }
  export type Model = CategoryModel
}
