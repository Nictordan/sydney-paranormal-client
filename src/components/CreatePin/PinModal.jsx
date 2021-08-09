import React from 'react';
import { Button } from '@material-ui/core';

import { FormWrapper } from '../../styles/FormWrapper';

const PinModal = ({ showModal, setShowModal }) => {
  return (
    <>
      {showModal 
      ? (
        <FormWrapper showModal={showModal}>
          <p>Hello there</p>
          <Button onClick={() => setShowModal(prev => !prev)}>
            &times;
          </Button>
        </FormWrapper>
      )
      : null}
    </>
  );
};

export default PinModal;