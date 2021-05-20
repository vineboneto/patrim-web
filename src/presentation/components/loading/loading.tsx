import './loading-styles.css'
import CircularProgress from '@material-ui/core/CircularProgress'

import React from 'react'

const Loading: React.FC = () => {
  return (
    <div className="col-12 loading">
      <CircularProgress color="inherit" data-testid="spinner" />
    </div>
  )
}

export default Loading
