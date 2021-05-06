import './alert-styles.css'

import React from 'react'
import AlertM from '@material-ui/lab/Alert'

type Props = {
  message: string
  type: 'success' | 'info' | 'warning' | 'error'
}

const Alert: React.FC<Props> = ({ message, type, ...rest }: Props) => {
  return (
    <AlertM
      {...rest}
      severity={type}
      className="alert-wrap"
    >
      {message}
    </AlertM>
  )
}

export default Alert
