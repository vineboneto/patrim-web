import { PatrimonyModel } from '@/domain/models'

export interface LoadPatrimoniesByNumber {
  loadByNumber(params: LoadPatrimoniesByNumber.Params): Promise<LoadPatrimoniesByNumber.Model[]>
}

export namespace LoadPatrimoniesByNumber {
  export type Params = {
    number: string
  }
  export type Model = PatrimonyModel
}
