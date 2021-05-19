import { PatrimonyModel } from '@/domain/models'

export interface LoadPatrimonyByNumber {
  loadByNumber(params: LoadPatrimonyByNumber.Params): Promise<LoadPatrimonyByNumber.Model>
}

export namespace LoadPatrimonyByNumber {
  export type Params = {
    number: string
  }
  export type Model = PatrimonyModel
}
