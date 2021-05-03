import './user-styles.css'

import React from 'react'
import { useHistory } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import IconButton from '@material-ui/core/IconButton'

const User: React.FC = () => {
  const history = useHistory()

  const handleExit = (): void => {
    history.replace('/login')
  }

  return (
    <div className="user-wrap">
      <Typography color="inherit">
        Vinicius
      </Typography>
      <IconButton color="inherit" data-testid="exit-link" onClick={handleExit}>
        <ExitToAppIcon />
      </IconButton>
    </div>
  )
}

export default User
