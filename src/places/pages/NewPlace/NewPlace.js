import React, { useCallback } from 'react';

import './NewPlace.css';
import Input from '../../../shared/components/FormElements/Input/Input';
import {} from '../../../shared/util/validators';
import { VALIDATOR_REQUIRE } from '../../../shared/util/validators';
import { VALIDATOR_MINLENGTH } from '../../../shared/util/validators';

const NewPlace = () => {
  // useCallback will re-use this function instead of remaking to avoid infinite loop with child onInput
  const titleInputHandler = useCallback((id, value, isValid) => {}, []);
  const descriptionInputHandler = useCallback((id, value, isValid) => {}, []);
  return (
    <form className="place-form">
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText={`Please enter a valid title.`}
        onInput={titleInputHandler}
      />
      <Input
        id="description"
        element="textarea"
        type="text"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText={`Please enter a valid description (at least 5 characters).`}
        onInput={descriptionInputHandler}
      />
    </form>
  );
};

export default NewPlace;
