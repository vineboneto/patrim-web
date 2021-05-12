import { PatrimonyModel } from '@/domain/models'

export interface LoadPatrimonies {
  load (): Promise<LoadPatrimonies.Model[]>
}

export namespace LoadPatrimonies {
  export type Model = PatrimonyModel
}
