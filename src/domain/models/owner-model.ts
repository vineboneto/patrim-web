import { SectorModel } from '@/domain/models'

export type OwnerModel = {
  id: number
  name: string
  sector: SectorModel
}
