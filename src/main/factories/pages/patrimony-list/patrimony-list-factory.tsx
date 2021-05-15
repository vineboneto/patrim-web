import { makeRemoteLoadCategories, makeRemoteLoadOwners, makeRemoteLoadPatrimonies } from '@/main/factories/usecases'
import { PatrimonyList } from '@/presentation/pages'

import React from 'react'

export const makePatrimonyList: React.FC = () => {
  return (
    <PatrimonyList
      loadPatrimonies={makeRemoteLoadPatrimonies()}
      loadOwners={makeRemoteLoadOwners()}
      loadCategories={makeRemoteLoadCategories()}
    />
  )
}
