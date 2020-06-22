import React, { useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import CancelIcon from '@material-ui/icons/Cancel';

const ModalCloseButon = (props) => {

  const { close, styles } = props

  console.log(styles);
  

  return (
    <IconButton style={styles} onClick={close} aria-label="Close Icon" size="medium" color="primary">
      <CancelIcon />
    </IconButton>
  )

}
export default ModalCloseButon