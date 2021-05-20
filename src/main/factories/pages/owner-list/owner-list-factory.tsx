import { makeRemoteLoadOwners, makeRemoteDeleteOwner } from '@/main/factories/usecases'
import { OwnerList } from '@/presentation/pages'

import React from 'react'

export const makeOwnerList: React.FC = () => {
  return (
    <OwnerList
      deleteOwner={makeRemoteDeleteOwner()}
      loadOwners={makeRemoteLoadOwners()}
    />
  )
}
