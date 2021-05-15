import { PatrimonyModel } from '@/domain/models'

export interface LoadPatrimoniesByNumber {
  loadByNumber(number: string): Promise<LoadPatrimoniesByNumber.Model[]>
}

export namespace LoadPatrimoniesByNumber {
  export type Model = PatrimonyModel
}
