import { makePatrimonyUpdateValidation } from '@/main/factories/pages'
import { makeRemoteUpdatePatrimony, makeRemoteLoadOwners, makeRemoteLoadCategories } from '@/main/factories/usecases'
import { PatrimonyUpdate } from '@/presentation/pages'

import React from 'react'
import { useParams } from 'react-router-dom'

type Params = {
  id: string
}

export const makePatrimonyUpdate: React.FC = () => {
  const { id } = useParams<Params>()

  return (
    <PatrimonyUpdate
      validation={makePatrimonyUpdateValidation()}
      updatePatrimony={makeRemoteUpdatePatrimony(Number(id))}
      loadCategories={makeRemoteLoadCategories()}
      loadOwners={makeRemoteLoadOwners()}
    />
  )
}
