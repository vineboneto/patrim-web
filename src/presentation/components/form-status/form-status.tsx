import './form-status-styles.css'
import { FormContext, Loading, Alert } from '@/presentation/components'

import React, { useContext } from 'react'

const FormStatus: React.FC = () => {
  const { state } = useContext(FormContext)

  return (
    <div data-testid="error-wrap" className="form-status-wrap">
      { state.isLoading && <Loading /> }
      { state.mainError && <Alert message={state.mainError} type="error" data-testid="main-error" /> }
    </div>
  )
}

export default FormStatus
