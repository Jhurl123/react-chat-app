import React, { useState } from 'react'
import IconButton from "@material-ui/core/IconButton"
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from "@material-ui/icons/AccountCircle"


const LogoutButton = () => {

  const [anchorEl, setAnchorEl] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem('user'))
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const logout = () => {
    localStorage.removeItem('user')
    window.location.reload()
    handleClose()
  }

  return (
    <div>
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>

      {currentUser && (
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={logout}>Log out</MenuItem>
        </Menu>
      )}
    </div>
  )
}

export default LogoutButton