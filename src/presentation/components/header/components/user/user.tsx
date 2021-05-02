import './user-styles.css'

import React from 'react'
import Typography from '@material-ui/core/Typography'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import IconButton from '@material-ui/core/IconButton'

const User: React.FC = () => {
  return (
    <div className="user-wrap">
      <Typography color="inherit">
        Vinicius
      </Typography>
      <IconButton color="inherit">
        <ExitToAppIcon />
      </IconButton>
    </div>
  )
}

export default User
