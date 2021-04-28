import './form-status-styles.css'
import { FormContext } from '@/presentation/components'

import React, { useContext } from 'react'

const FormStatus: React.FC = () => {
  const { state } = useContext(FormContext)

  return (
    <div data-testid="error-wrap" className="form-status-wrap">
      { state.isLoading && <div data-testid="spinner" className="spinner-border" /> }
      { state.mainError && <span data-testid="main-error">{state.mainError}</span> }
    </div>
  )
}

export default FormStatus
