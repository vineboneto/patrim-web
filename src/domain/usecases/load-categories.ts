import { CategoryModel } from '@/domain/models'

export interface LoadCategories {
  load (): Promise<LoadCategories.Model>
}

export namespace LoadCategories {
  export type Model = {
    model: CategoryModel[]
    count: number
  }
}
