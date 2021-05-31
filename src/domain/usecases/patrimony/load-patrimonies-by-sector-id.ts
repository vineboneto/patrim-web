import { PatrimonyModel } from '@/domain/models'

export interface LoadPatrimoniesBySectorId {
  loadBySectorId (params: LoadPatrimoniesBySectorId.Params): Promise<LoadPatrimoniesBySectorId.Model>
}

export namespace LoadPatrimoniesBySectorId {
  export type Params = {
    id: number
    skip?: number
    take?: number
  }
  export type Model = {
    model: PatrimonyModel[]
    count: number
  }
}
