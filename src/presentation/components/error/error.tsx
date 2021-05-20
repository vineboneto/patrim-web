import './error-styles.css'
import { Button, LoadContext } from '@/presentation/components'

import React, { MouseEvent, useContext } from 'react'

const Error: React.FC = () => {
  const { state, setState } = useContext(LoadContext)

  const handleReload = (e: MouseEvent): void => {
    setState(old => ({
      ...old,
      reload: !state.reload,
      isLoading: true,
      mainError: '',
      category: ''
    }))
  }

  return (
    <div className="col-12">
      <div className="error">
        <span data-testid="main-error">{state.mainError}</span>
        <Button color="secondary" variant="outlined" text="Recarregar" onClick={handleReload} data-testid="reload" />
      </div>
    </div>
  )
}

export default Error
