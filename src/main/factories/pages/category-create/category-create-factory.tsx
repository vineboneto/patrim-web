import { makeRemoteAddCategory } from '@/main/factories/usecases'
import { makeCategoryCreateValidation } from '@/main/factories/pages'
import { CategoryCreate } from '@/presentation/pages'

import React from 'react'

export const makeCategoryCreate: React.FC = () => {
  return (
    <CategoryCreate
      validation={makeCategoryCreateValidation()}
      addCategory={makeRemoteAddCategory()}
    />
  )
}
