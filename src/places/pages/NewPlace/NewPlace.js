import React from 'react';
import Input from '../../../shared/components/FormElements/Input/Input';

const NewPlace = () => {
  // Stubbing out some add place logic,not too deep, will eventually send to server instead
  // Not worth adding to 'DUMMY_PLACES'
  return (
    <form className="place-form">
      <Input type="text" label="Title" />
    </form>
  );
};

export default NewPlace;
