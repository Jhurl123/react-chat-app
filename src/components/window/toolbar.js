import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Appbar from "@material-ui/core/Appbar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";

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
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
}));

const WindowToolbar = (props) => {
  const classes = useStyles();

  return (
    <Appbar className={classes.toolbar} position="static">
      <Toolbar className={classes.toolbarLayout}>
        <h1 className={classes.toolHeader}>Whats Popping</h1>
        <div className={classes.sectionDesktop}>
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
      </Toolbar>
    </Appbar>
  );
};

export default WindowToolbar;
