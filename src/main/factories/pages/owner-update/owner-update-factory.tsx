import { OwnerUpdate } from '@/presentation/pages'
import { makeRemoteLoadOwnerById, makeRemoteLoadSectors, makeRemoteUpdateOwner } from '@/main/factories/usecases'
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
      loadOwnerById={makeRemoteLoadOwnerById(Number(id))}
      validation={makeOwnerUpdateValidation()}
      updateOwner={makeRemoteUpdateOwner(Number(id))}
      loadSectors={makeRemoteLoadSectors()}
     />
  )
}
