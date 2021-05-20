import { makeRemoteDeleteSector, makeRemoteLoadSectors } from '@/main/factories/usecases'
import { SectorList } from '@/presentation/pages'

import React from 'react'

export const makeSectorList: React.FC = () => {
  return (
    <SectorList
      deleteSector={makeRemoteDeleteSector()}
      loadSectors={makeRemoteLoadSectors()}
    />
  )
}
