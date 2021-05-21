import './loading-styles.css'
import CircularProgress from '@material-ui/core/CircularProgress'

import React from 'react'

type Props = {
  size?: number
}

const Loading: React.FC<Props> = ({ size }: Props) => {
  return (
    <div className="col-12 loading">
      <CircularProgress color="inherit" size={size} data-testid="spinner" />
    </div>
  )
}

export default Loading
