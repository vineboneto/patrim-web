import './open-menu-styles.css'
import { DashboardContext } from '@/presentation/components'

import React, { useContext } from 'react'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import IconButton from '@material-ui/core/IconButton'

const OpenMenu: React.FC = () => {
  const { setState } = useContext(DashboardContext)

  const handleOpen = (): void => setState(old => ({ ...old, openDashboard: !old.openDashboard }))

  return (
    <div className="menu-wrap" data-testid="menu" onClick={handleOpen}>
      <IconButton edge="start" color="inherit" aria-label="menu">
        <MenuIcon />
        <Typography variant="h6" color="inherit">
          Patrim
        </Typography>
      </IconButton>
    </div>
  )
}

export default OpenMenu
