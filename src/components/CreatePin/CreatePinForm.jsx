import React, { useState } from 'react';
import { 
  TextField,
  Button, 
} from '@material-ui/core';

import './CreatePinForm.css'
import api from '../../config/api';
import { FormWrapper } from '../../styles/FormWrapper';

const CreatePinForm = () => {
  const initialValue = {
    title: '',
    description: '',
    street: '',
    suburb: '',
    state: '',
    country: '',
  }
  
  const [pin, setPin] = useState(initialValue)

  const handleChange = (e) => {
    setPin((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    api.post('/api/add_location', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      title: pin.title,
      description: pin.description,
      street: pin.street,
      suburb: pin.suburb,
      state: pin.state,
      country: pin.country,
    })
    .then(setPin(initialValue));
  }

  return (
    <>
      <FormWrapper onSubmit={handleSubmit}>
        <TextField 
          type="text" 
          name="title" 
          id="title" 
          className="textfield"
          label="Title"
          variant="outlined"
          color="secondary"
          value={pin.title}
          onChange={handleChange}
        />
        <br />
        
        <TextField
          type="textarea"
          name="description"
          id="description"
          className="textfield"
          label="Description"
          variant="outlined"
          color="secondary"
          value={pin.description}
          onChange={handleChange}
        />
        <br />

        <TextField
          type="text"
          name="street"
          id="street"
          className="textfield"
          label="Street Address"
          variant="outlined"
          color="secondary"
          value={pin.street}
          onChange={handleChange}
        />
        <br />

        <TextField
          type="text"
          name="suburb"
          id="suburb"
          className="textfield"
          label="Suburb"
          variant="outlined"
          color="secondary"
          value={pin.suburb}
          onChange={handleChange}
        />
        <br />

        <TextField
          type="text"
          name="state"
          id="state"
          className="textfield"
          label="State"
          variant="outlined"
          color="secondary"
          value={pin.state}
          onChange={handleChange}
        />
        <br />

        <TextField
          type="text"
          name="country"
          id="country"
          className="textfield"
          label="Country"
          variant="outlined"
          color="secondary"
          value={pin.state}
          onChange={handleChange}
        />
        <br />
        
        <Button 
          type="submit" 
          id="submit"
          variant="contained"
          color="secondary"
        >
          Create Pin
        </Button>
        <br />

      </FormWrapper>
    </>
  );
};

export default CreatePinForm;
