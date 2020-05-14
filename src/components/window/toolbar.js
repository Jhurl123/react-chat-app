import React from "react";
import { makeStyles } from "@material-ui/core/styles"
import Appbar from "@material-ui/core/Appbar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Badge from "@material-ui/core/Badge"
import AccountCircle from "@material-ui/icons/AccountCircle"
import MailIcon from "@material-ui/icons/Mail"
import NotificationsIcon from "@material-ui/icons/Notifications"
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles((theme) => ({
  toolbar: {
    padding: "1rem",
    backgroundColor: "#D3D3D3",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    color: "#ffffff",
    textShadow: '1px 1px #908e8e'
  },
  toolHeader: {
    margin: 0,
  },
  toolbarLayout: {
    justifyContent: "space-between",
  },
  sectionDesktop: {
    display: "flex",
    justifyContent: 'space-between',
    width: '100%',
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  sectionMobile: {
    display: "none",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      width: '100%',
      justifyContent: 'space-between',
      
    },
  },
}));

const WindowToolbar = (props) => {
  const classes = useStyles();

  return (
    <Appbar className={classes.toolbar} position="static">
      <Toolbar className={classes.toolbarLayout}>
        <div className={classes.sectionDesktop}>
          <h1 className={classes.toolHeader}>Whats Popping</h1>
          <div>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              // aria-controls={menuId}
              aria-haspopup="true"
              // onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </div>

        <div className={classes.sectionMobile}>
          <IconButton 
            aria-label="Open Conversations" 
            color="inherit"
            onClick={e=>props.handleMenu(e)}
          >
              <MenuIcon />
          </IconButton>
          <h1 className={classes.toolHeader}>Whats Popping</h1>
        </div>
      </Toolbar>
    </Appbar>
  );
};

export default WindowToolbar;
