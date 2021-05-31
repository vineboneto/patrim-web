import {
  makeLoadPatrimonyByNumber,
  makeRemoteDeletePatrimony,
  makeRemoteLoadCategories,
  makeRemoteLoadOwners,
  makeRemoteLoadPatrimonies,
  makeRemoteLoadPatrimoniesByCategoryId,
  makeRemoteLoadPatrimoniesByOwnerId,
  makeRemoteLoadPatrimoniesBySectorId,
  makeRemoteLoadSectors
} from '@/main/factories/usecases'
import { PatrimonyList } from '@/presentation/pages'

import React from 'react'

export const makePatrimonyList: React.FC = () => {
  return (
    <PatrimonyList
      loadPatrimonies={makeRemoteLoadPatrimonies()}
      loadOwners={makeRemoteLoadOwners()}
      loadCategories={makeRemoteLoadCategories()}
      loadSectors={makeRemoteLoadSectors()}
      loadPatrimoniesByCategoryId={makeRemoteLoadPatrimoniesByCategoryId()}
      loadPatrimoniesByOwnerId={makeRemoteLoadPatrimoniesByOwnerId()}
      loadPatrimoniesBySectorId={makeRemoteLoadPatrimoniesBySectorId()}
      loadPatrimonyByNumber={makeLoadPatrimonyByNumber()}
      deletePatrimony={makeRemoteDeletePatrimony()}
    />
  )
}
