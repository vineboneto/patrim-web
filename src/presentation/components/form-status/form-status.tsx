import './form-status-styles.css'
import { FormContext, Loading, Alert } from '@/presentation/components'

import React, { useContext } from 'react'

const FormStatus: React.FC = () => {
  const { state, setState } = useContext(FormContext)
  const handleCloseError = (): void => {
    setState(old => ({
      ...old,
      mainError: ''
    }))
  }

  const handleCloseSuccess = (): void => {
    setState(old => ({
      ...old,
      successMessage: ''
    }))
  }

  return (
    <div data-testid="status-wrap" className="form-status-wrap">
      { state.isLoading && <Loading /> }
      { state.mainError &&
        <Alert
          message={state.mainError}
          type="error"
          data-testid="main-error"
          handleClose={handleCloseError}
        /> }
      { state.successMessage &&
        <Alert message={state.successMessage}
          type="success"
          data-testid="success-message"
          handleClose={handleCloseSuccess}
        /> }
    </div>
  )
}

export default FormStatus
