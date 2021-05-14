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
    <div className="menu-wrap">
      <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleClick} data-testid="menu">
        <MenuIcon />
        <Typography variant="h6" color="inherit">
          Patrim
        </Typography>
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} >
          <Link to="/" data-testid="patrimonies-menu">Patrimônios</Link>
        </MenuItem>
        <MenuItem onClick={handleClose} >
          <Link to="/owners" data-testid="owners-menu">Proprietários</Link>
        </MenuItem>
        <MenuItem onClick={handleClose} >
          <Link to="/categories" data-testid="categories-menu">Categorias</Link>
        </MenuItem>
        <MenuItem onClick={handleClose} >
          <Link to="/sectors" data-testid="sectors-menu">Setores</Link>
        </MenuItem>
      </Menu>
    </div>
  )
}

export default OpenMenu
