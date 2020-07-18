import React, { useState } from 'react'
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import ModalCloseButon from './modalCloseButton'
import NewConversationForm from './newConversationForm'
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 650,
    maxWidth: '95%',
    textAlign: 'center', 
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    overflow: 'hidden',
    boxShadow: theme.shadows[5],
    transition: 'all 300ms linear',
    padding: theme.spacing(2, 4, 3),
  }

}))

const NewConversationModal = (props) => {

  const classes = useStyles();
  const { open, toggleModal } = props

  const closeButtonStyles = {
    position: "absolute",
    right: "10px",
    top: "10px"
  }

  return (
    <Modal
      open={open}
      onClose={toggleModal}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
      BackdropComponent={Backdrop}
    >
      <div className={classes.paper}>
        <ModalCloseButon styles={closeButtonStyles} close={toggleModal} />
        <h2>Say 'Hi' to some one new!</h2>
        <NewConversationForm closeModal={toggleModal} />
      </div>

    </Modal>
  )
}

NewConversationModal.propTypes = {
  open: PropTypes.bool,
  toggleModal: PropTypes.func
}

export default NewConversationModal