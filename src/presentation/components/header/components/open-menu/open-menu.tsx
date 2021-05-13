import './open-menu-styles.css'

import React from 'react'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'

const OpenMenu: React.FC = () => {
  return (
    <div className="menu-wrap" data-testid="menu">
      <IconButton edge="start" color="inherit" aria-label="menu">
        <Typography variant="h6" color="inherit">
          Patrim
        </Typography>
      </IconButton>
    </div>
  )
}

export default OpenMenu
