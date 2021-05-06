import './alert-styles.css'

import React from 'react'
import AlertM from '@material-ui/lab/Alert'

type Props = {
  message: string
  type: 'success' | 'info' | 'warning' | 'error'
  handleClose: () => void
}

const Alert: React.FC<Props> = ({ message, type, handleClose, ...rest }: Props) => {
  return (
    <AlertM
      {...rest}
      onClose={handleClose}
      severity={type}
      className="alert-wrap"
    >
      {message}
    </AlertM>
  )
}

export default Alert
