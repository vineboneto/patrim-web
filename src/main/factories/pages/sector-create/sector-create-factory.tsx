import { makeRemoteAddSector } from '@/main/factories/usecases'
import { makeSectorCreateValidation } from '@/main/factories/pages'
import { SectorCreate } from '@/presentation/pages'

import React from 'react'

export const makeSectorCreate: React.FC = () => {
  return (
    <SectorCreate
      validation={makeSectorCreateValidation()}
      addSector={makeRemoteAddSector()}
    />
  )
}
