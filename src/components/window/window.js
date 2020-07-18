import React, { useState } from 'react';
import { Container, Box } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles"
import WindowToolbar from './toolbar';
import WindowPane from './windowPane';

const useStyles = makeStyles((theme) => ({
  toolHeader: {
    margin: 0,
  },
  headerMobile: {
    color: '#ffffff',
    display: 'none',
    textShadow: '1px 1px #908e8e',
    marginBottom: '1rem',
    [theme.breakpoints.down("md")]: {
      display: 'flex',
      justifyContent: 'center'
    }
  }

}))

const Window = () => {

  const classes = useStyles()

  // Breakpoint is 1280
  const [menuOpen, setMenuStatus] = useState(false)

  const toggleMenu = () => {
    setMenuStatus(prevState => !prevState)    
  }

  // TODO refactor to only rerender when the size condition is met
  return (
    <Container maxWidth={'lg'}>
      <Box mt={8} mb={8}>
        <div className={classes.headerMobile}>
          <h1 className={classes.toolHeader}>Whats Popping</h1>
        </div>
        <WindowToolbar handleMenu={toggleMenu}/>
        <WindowPane menuStatus={menuOpen} />
      </Box>
    </Container>
  )
};

export default Window;
