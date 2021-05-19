import { SectorModel } from '@/domain/models'

export interface LoadSectors {
  load (params: LoadSectors.Params): Promise<LoadSectors.Model>
}

export namespace LoadSectors {
  export type Params = {
    take?: number
    skip?: number
  }
  export type Model = {
    model: SectorModel[]
    count: number
  }
}
