import { makeRemoteAddOwner, makeRemoteLoadSectors } from '@/main/factories/usecases'
import { makeOwnerCreateValidation } from '@/main/factories/pages'
import { OwnerCreate } from '@/presentation/pages'

import React from 'react'

export const makeOwnerCreate: React.FC = () => {
  return (
    <OwnerCreate
      validation={makeOwnerCreateValidation()}
      addOwner={makeRemoteAddOwner()}
      loadSectors={makeRemoteLoadSectors()}
    />
  )
}
