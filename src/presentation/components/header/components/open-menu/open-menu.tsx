import './open-menu-styles.css'

import React, { MouseEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MenuIcon from '@material-ui/icons/Menu'

const OpenMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<any>(null)

  const handleClick = (event: MouseEvent): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (): void => {
    setAnchorEl(null)
  }

  return (
    <div className="menu-wrap" data-testid="menu">
      <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleClick}>
        <MenuIcon />
        <Typography variant="h6" color="inherit">
          Patrim
        </Typography>
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        className="menu"
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} className="menu-item">
          <Link to="/">Patrimônios</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/owners">Proprietários</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/categories">Categorias</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/sectors">Setores</Link>
        </MenuItem>
      </Menu>
    </div>
  )
}

export default OpenMenu
