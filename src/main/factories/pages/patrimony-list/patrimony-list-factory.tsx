import {
  makeLoadPatrimonyByNumber,
  makeRemoteDeletePatrimony,
  makeRemoteLoadCategories,
  makeRemoteLoadOwners,
  makeRemoteLoadPatrimonies,
  makeRemoteLoadPatrimoniesByCategoryId,
  makeRemoteLoadPatrimoniesByOwnerId
} from '@/main/factories/usecases'
import { PatrimonyList } from '@/presentation/pages'

import React from 'react'

export const makePatrimonyList: React.FC = () => {
  return (
    <PatrimonyList
      loadPatrimonies={makeRemoteLoadPatrimonies()}
      loadOwners={makeRemoteLoadOwners()}
      loadCategories={makeRemoteLoadCategories()}
      loadPatrimoniesByCategoryId={makeRemoteLoadPatrimoniesByCategoryId()}
      loadPatrimonyByNumber={makeLoadPatrimonyByNumber()}
      deletePatrimony={makeRemoteDeletePatrimony()}
      loadPatrimoniesByOwnerId={makeRemoteLoadPatrimoniesByOwnerId()}
    />
  )
}
