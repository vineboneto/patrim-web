import './error-styles.css'
import { Button } from '@/presentation/components'

import React from 'react'

type Props = {
  handleReload: () => void
  error: string
}

const Error: React.FC<Props> = ({ error, handleReload }: Props) => {
  return (
    <div className="col-12">
      <div className="error">
        <span data-testid="main-error">{error}</span>
        <Button color="secondary" variant="outlined" text="Recarregar" onClick={handleReload} data-testid="reload" />
      </div>
    </div>
  )
}

export default Error
