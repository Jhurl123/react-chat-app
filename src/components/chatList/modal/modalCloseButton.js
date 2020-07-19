import React from 'react'
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton'
import CancelIcon from '@material-ui/icons/Cancel';

const ModalCloseButton = (props) => {

  const { close, styles } = props
  
  return (
    <IconButton style={styles} onClick={close} aria-label="Close Icon" size="medium" color="primary">
      <CancelIcon />
    </IconButton>
  )

}

ModalCloseButton.propTypes = {
  close: PropTypes.func,
  styles: PropTypes.object
}

export default ModalCloseButton