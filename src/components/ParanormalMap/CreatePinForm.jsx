import React, { useState } from 'react';
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
    .then(setPin(initialValue))
  }

  return (
    <>
      <FormWrapper onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input 
          type="text" 
          name="title" 
          id="title" 
          value={pin.title}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="description">Description</label>
        <textarea 
          name="description" 
          id="description"
          value={pin.description}
          onChange={handleChange} 
        />
        <br />

        <label htmlFor="street">Street Address</label>
        <input 
          type="text" 
          name="street" 
          id="street"
          value={pin.street}
          onChange={handleChange} 
        />
        <br />

        <label htmlFor="suburb">Suburb</label>
        <input 
          type="text" 
          name="suburb" 
          id="suburb"
          value={pin.suburb}
          onChange={handleChange} 
        />
        <br />

        <label htmlFor="state">State</label>
        <input 
          type="text" 
          name="state" 
          id="state"
          value={pin.state}
          onChange={handleChange} 
        />
        <br />

        <label htmlFor="country">Country</label>
        <input 
          type="text" 
          name="country" 
          id="country"
          value={pin.country}
          onChange={handleChange} 
        />
        <br />

        <input type="submit" value="Create Pin" id="submit" />
        <br />

      </FormWrapper>
    </>
  );
};

export default CreatePinForm;
