import React from 'react';
import { useParams } from 'react-router-dom';
import { DUMMY_PLACES } from '../UserPlaces/UserPlaces';
import Input from '../../../shared/components/FormElements/Input/Input';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../../shared/util/validators';
import Button from '../../../shared/components/FormElements/Button/Button';
import './UpdatePlace.css';
import { useForm } from '../../../shared/hooks/form-hook';

const UpdatePlace = () => {
  // again using 'useParams' to grab :placeId from the URL
  const placeId = useParams().placeId;
  const identifiedPlace = DUMMY_PLACES.find(place => place.id === placeId);

  const [formState, inputHandler] = useForm(
    {
      title: { value: identifiedPlace.title, isValid: true },
      description: {
        value: identifiedPlace.description,
        isValid: true
      }
    },
    true
  );

  const updatePlaceSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  // if place not found in list of places return error message otherwise render form
  return !identifiedPlace ? (
    <div className="center">
      <h2>Could not find place!</h2>
    </div>
  ) : (
    <form className="place-form" onSubmit={updatePlaceSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a description with at least 5 characters."
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        Update Place
      </Button>
    </form>
  );
};

export default UpdatePlace;
