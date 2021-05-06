import { makePatrimonyCreateValidation } from '@/main/factories/pages'
import { makeRemoteAddPatrimony } from '@/main/factories/usecases'
import { PatrimonyCreate } from '@/presentation/pages'

import React from 'react'

export const makePatrimonyCreate: React.FC = () => {
  return (
    <PatrimonyCreate
      validation={makePatrimonyCreateValidation()}
      addPatrimony={makeRemoteAddPatrimony()}
    />
  )
}