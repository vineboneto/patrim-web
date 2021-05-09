import { makePatrimonyCreateValidation } from '@/main/factories/pages'
import { makeRemoteAddPatrimony, makeRemoteLoadCategories, makeRemoteLoadOwners } from '@/main/factories/usecases'
import { PatrimonyCreate } from '@/presentation/pages'

import React from 'react'

export const makePatrimonyCreate: React.FC = () => {
  return (
    <PatrimonyCreate
      validation={makePatrimonyCreateValidation()}
      addPatrimony={makeRemoteAddPatrimony()}
      loadCategories={makeRemoteLoadCategories()}
      loadOwners={makeRemoteLoadOwners()}
    />
  )
}
