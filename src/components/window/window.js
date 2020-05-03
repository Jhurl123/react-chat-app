import React from 'react';
import { Container, Grid, Box } from '@material-ui/core';
import WindowToolbar from './toolbar';
import WindowPane from './windowPane';

const Window = (props) => {
  return (
    <Container maxWidth={'lg'}>
      <Box mt={8} mb={8}>
        <WindowToolbar />
        <WindowPane />
      </Box>
    </Container>
  )
};

export default Window;
