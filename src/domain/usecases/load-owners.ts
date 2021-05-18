import { OwnerModel } from '@/domain/models'

export interface LoadOwners {
  load (): Promise<LoadOwners.Model>
}

export namespace LoadOwners {
  export type Model = {
    model: OwnerModel[]
    count: number
  }
}
