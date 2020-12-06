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

const UpdatePlace = () => {
  // again using 'useParams' to grab :placeId from the URL
  const placeId = useParams().placeId;

  const identifiedPlace = DUMMY_PLACES.find(place => place.id === placeId);

  // if place not found in list of places return error message otherwise render form
  return !identifiedPlace ? (
    <div className="center">
      <h2>Could not find place!</h2>
    </div>
  ) : (
    <form className="place-form">
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={() => {}}
        value={identifiedPlace.title}
        valid={true}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a description with at least 5 characters."
        onInput={() => {}}
        value={identifiedPlace.description}
        valid={true}
      />
      <Button type="submit" disabled={true}>
        Update Place
      </Button>
    </form>
  );
};

export default UpdatePlace;
