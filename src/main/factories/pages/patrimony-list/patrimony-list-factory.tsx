import { makeRemoteLoadPatrimonies } from '@/main/factories/usecases'
import { PatrimonyList } from '@/presentation/pages'

import React from 'react'
import { useParams } from 'react-router-dom'

type Params = {
  take: string
  skip: string
}

export const makePatrimonyList: React.FC = () => {
  const { skip, take } = useParams<Params>()

  return (
    <PatrimonyList
      loadPatrimonies={makeRemoteLoadPatrimonies(skip, take)}
    />
  )
}
