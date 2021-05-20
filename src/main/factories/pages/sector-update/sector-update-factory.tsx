import { makeRemoteUpdateSector } from '@/main/factories/usecases'
import { makeSectorUpdateValidation } from '@/main/factories/pages'
import { SectorUpdate } from '@/presentation/pages'

import React from 'react'
import { useParams } from 'react-router-dom'

type Params = {
  id: string
}

export const makeSectorUpdate: React.FC = () => {
  const { id } = useParams<Params>()

  return (
    <SectorUpdate
      updateSector={makeRemoteUpdateSector(Number(id))}
      validation={makeSectorUpdateValidation()}
    />
  )
}
