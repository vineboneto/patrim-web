import './error-styles.css'
import { Button } from '@/presentation/components'

import React from 'react'

type Props = {
  error: string
}

const Error: React.FC<Props> = ({ error }: Props) => {
  return (
    <div className="col-12">
      <div className="error">
        <span>{error}</span>
        <Button color="secondary" variant="outlined" text="Recarregar" />
      </div>
    </div>
  )
}

export default Error
