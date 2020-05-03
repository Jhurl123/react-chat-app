import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid } from '@material-ui/core'
import ChatList from '../chatList/chatList'

const useStyles = makeStyles((theme) => ({
  pane: {
    minHeight: '80vh',
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px',
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
  }
}))

const WindowPane = (props) => {

  const classes = useStyles()

  return (
   <div className={classes.pane}>
     <Container style={{padding: 0}}>
      <Grid item sm={4}>
        <ChatList />
      </Grid>
     </Container>
   </div>
  )
}

export default WindowPane