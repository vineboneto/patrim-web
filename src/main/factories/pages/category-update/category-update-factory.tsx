import { makeRemoteLoadCategoryById, makeRemoteUpdateCategory } from '@/main/factories/usecases'
import { makeCategoryUpdateValidation } from '@/main/factories/pages'
import { CategoryUpdate } from '@/presentation/pages'

import React from 'react'
import { useParams } from 'react-router-dom'

type Params = {
  id: string
}

export const makeCategoryUpdate: React.FC = () => {
  const { id } = useParams<Params>()

  return (
    <CategoryUpdate
      updateCategory={makeRemoteUpdateCategory(Number(id))}
      validation={makeCategoryUpdateValidation()}
      loadCategoryById={makeRemoteLoadCategoryById(Number(id))}
    />
  )
}
