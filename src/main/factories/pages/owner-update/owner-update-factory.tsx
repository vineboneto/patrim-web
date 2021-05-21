import { OwnerUpdate } from '@/presentation/pages'
import { makeRemoteLoadSectors, makeRemoteUpdateOwner } from '@/main/factories/usecases'
import { makeOwnerUpdateValidation } from '@/main/factories/pages'

import React from 'react'
import { useParams } from 'react-router-dom'

type Params = {
  id: string
}

export const makeOwnerUpdate: React.FC = () => {
  const { id } = useParams<Params>()

  return (
    <OwnerUpdate
      validation={makeOwnerUpdateValidation()}
      updateOwner={makeRemoteUpdateOwner(Number(id))}
      loadSectors={makeRemoteLoadSectors()}
     />
  )
}
