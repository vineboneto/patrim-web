import { makePatrimonyCreateValidation, makeCategoryCreateValidation } from '@/main/factories/pages'
import {
  makeRemoteAddPatrimony,
  makeRemoteLoadCategories,
  makeRemoteLoadOwners,
  makeRemoteAddCategory
} from '@/main/factories/usecases'
import { PatrimonyCreate } from '@/presentation/pages'

import React from 'react'

export const makePatrimonyCreate: React.FC = () => {
  return (
    <PatrimonyCreate
      addCategory={makeRemoteAddCategory()}
      validationCategory={makeCategoryCreateValidation()}
      validation={makePatrimonyCreateValidation()}
      addPatrimony={makeRemoteAddPatrimony()}
      loadCategories={makeRemoteLoadCategories()}
      loadOwners={makeRemoteLoadOwners()}
    />
  )
}
