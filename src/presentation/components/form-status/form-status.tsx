import './form-status-styles.css'
import { FormContext } from '@/presentation/components'

import React, { useContext } from 'react'

const FormStatus: React.FC = () => {
  const { state } = useContext(FormContext)

  return (
    <div data-testid="error-wrap" className="form-status-wrap">
      { state.isLoading && <div className="spinner-border" data-testid="spinner" /> }
      { state.mainError && <span data-testid="main-error">Error</span> }
    </div>
  )
}

export default FormStatus
