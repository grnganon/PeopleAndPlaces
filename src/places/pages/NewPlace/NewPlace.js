import React, { useCallback, useReducer } from 'react';

import './NewPlace.css';
import Input from '../../../shared/components/FormElements/Input/Input';
import {} from '../../../shared/util/validators';
import { VALIDATOR_REQUIRE } from '../../../shared/util/validators';
import { VALIDATOR_MINLENGTH } from '../../../shared/util/validators';
import Button from '../../../shared/components/FormElements/Button/Button';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      // Checking each input in the form for validity, at the single level it just check if valid, then compares with all
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid }
        },
        isValid: formIsValid
      };
    default:
      return state;
  }
};

const NewPlace = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      title: { value: '', isValid: false },
      description: { value: '', isValid: false }
    },
    isValid: false
  });
  // useCallback will re-use this function instead of remaking to avoid infinite loop with child onInput
  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: 'INPUT_CHANGE',
      value: value,
      isValid: isValid,
      inputId: id
    });
  }, []);

  const placeSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs); // Placeholder, will need to send to backend
  };

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText={`Please enter a valid title.`}
        onInput={inputHandler}
      />
      <Input
        id="description"
        element="textarea"
        type="text"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText={`Please enter a valid description (at least 5 characters).`}
        onInput={inputHandler}
      />
      <Input
        id="address"
        element="input"
        type="text"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText={`Please enter a valid address.`}
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        {' '}
        ADD PLACE{' '}
      </Button>
    </form>
  );
};

export default NewPlace;
