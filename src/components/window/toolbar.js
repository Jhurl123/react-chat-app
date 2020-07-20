import React from "react";
import PropTypes from 'prop-types'
import { makeStyles } from "@material-ui/core/styles"
import Appbar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from '@material-ui/icons/Menu'
import LogoutButton from './logoutButton'

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
            <LogoutButton />
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

          <LogoutButton />
        </div>
      </Toolbar>
    </Appbar>
  );
};

WindowToolbar.propTypes = {
  handleMenu: PropTypes.func
}

export default WindowToolbar;
