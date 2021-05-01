import './form-status-styles.css'
import { FormContext } from '@/presentation/components'

import React, { useContext } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import MuiAlert from '@material-ui/lab/Alert'

const FormStatus: React.FC = () => {
  const { state } = useContext(FormContext)

  return (
    <div data-testid="error-wrap" className="form-status-wrap">
      { state.isLoading && <CircularProgress color="inherit" data-testid="spinner" /> }
      { state.mainError && <MuiAlert severity="error" data-testid="main-error">{state.mainError}</MuiAlert> }
    </div>
  )
}

export default FormStatus
