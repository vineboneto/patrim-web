import './user-styles.css'
import { ApiContext } from '@/presentation/components'

import { useLogout } from '@/presentation/hooks'
import React, { MouseEvent, useContext } from 'react'
import Typography from '@material-ui/core/Typography'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import IconButton from '@material-ui/core/IconButton'

const User: React.FC = () => {
  const logout = useLogout()
  const { getCurrentAccount } = useContext(ApiContext)

  const handleExit = (e: MouseEvent): void => {
    e.preventDefault()
    logout()
  }

  return (
    <div className="user-wrap">
      <Typography color="inherit" data-testid="username">
        {getCurrentAccount().name}
      </Typography>
      <IconButton color="inherit" data-testid="exit-link" onClick={handleExit}>
        <ExitToAppIcon />
      </IconButton>
    </div>
  )
}

export default User
