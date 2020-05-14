import React, { useState } from 'react';
import { Container, Grid, Box } from '@material-ui/core';
import useWindowSize from '../../hooks/useWindowSize'
import WindowToolbar from './toolbar';
import WindowPane from './windowPane';

const Window = (props) => {

  const size = useWindowSize()

  // Breakpoint is 1280
  const [menuOpen, setMenuStatus] = useState(false)

  const toggleMenu = event => {
    setMenuStatus(prevState => !prevState)    
  }
  
  // refactor to only rerender when the size condition is met
  return (
    <Container maxWidth={'lg'}>
      <Box mt={8} mb={8}>
        <WindowToolbar handleMenu={toggleMenu}/>
        <WindowPane menuStatus={menuOpen} />
      </Box>
    </Container>
  )
};

export default Window;
