import {
  makePatrimonyCreateValidation,
  makeCategoryCreateValidation,
  makeOwnerCreateValidation
} from '@/main/factories/pages'
import {
  makeRemoteAddPatrimony,
  makeRemoteLoadCategories,
  makeRemoteLoadOwners,
  makeRemoteAddCategory,
  makeRemoteAddOwner,
  makeRemoteLoadSectors
} from '@/main/factories/usecases'
import { PatrimonyCreate } from '@/presentation/pages'

import React from 'react'

export const makePatrimonyCreate: React.FC = () => {
  return (
    <PatrimonyCreate
      addOwner={makeRemoteAddOwner()}
      loadSectors={makeRemoteLoadSectors()}
      validationOwner={makeOwnerCreateValidation()}
      addCategory={makeRemoteAddCategory()}
      validationCategory={makeCategoryCreateValidation()}
      validation={makePatrimonyCreateValidation()}
      addPatrimony={makeRemoteAddPatrimony()}
      loadCategories={makeRemoteLoadCategories()}
      loadOwners={makeRemoteLoadOwners()}
    />
  )
}
