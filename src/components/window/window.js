import React, { useState } from 'react';
import { Container, Box } from '@material-ui/core';
import WindowToolbar from './toolbar';
import WindowPane from './windowPane';
import SignUpModal from './signUpModal';

const Window = (props) => {

  // Breakpoint is 1280
  const [menuOpen, setMenuStatus] = useState(false)

  const toggleMenu = () => {
    setMenuStatus(prevState => !prevState)    
  }

  // refactor to only rerender when the size condition is met
  return (
    <Container maxWidth={'lg'}>
      <Box mt={8} mb={8}>
        <WindowToolbar handleMenu={toggleMenu}/>
        <WindowPane menuStatus={menuOpen} />
      </Box>
      <SignUpModal />
    </Container>
  )
};

export default Window;
