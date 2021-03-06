import React from "react";
import PropTypes from 'prop-types'
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  noPrompt: {
    textAlign: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)'
  }
}))

const NoMessagePrompt = (props) => {

  const classes = useStyles()

  return (
    <div>
      <h2 className={classes.noPrompt}>
        {props.children}
      </h2>
    </div>
  )
}

NoMessagePrompt.propTypes = {
  children: PropTypes.string
}

export default NoMessagePrompt