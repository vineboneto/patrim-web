import { makeRemoteLoadCategories, makeRemoteDeleteCategory } from '@/main/factories/usecases'
import { CategoryList } from '@/presentation/pages'

import React from 'react'

export const makeCategoryList: React.FC = () => {
  return (
    <CategoryList
      deleteCategory={makeRemoteDeleteCategory()}
      loadCategories={makeRemoteLoadCategories()}
    />
  )
}
