import { useCallback, useReducer } from 'react';

/*
    1. useReducer takes in a reducer switch on what case should trigger what in state, and an initial state
    2. useReducer returns an array with state and a function that will take new cases (which will update state again)
 */

// hooks should always start with 'use'
export const useForm = (initialInputs, initialFormValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: 'INPUT_CHANGE',
      value: value,
      isValid: isValid,
      inputId: id
    });
  }, []);

  // we are now setting default for fields in update place, and want to simulate how we would update once a back-end API call returned with the place info
  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
      type: 'SET_DATA',
      inputs: inputData,
      formIsValid: formValidity
    });
  }, []);

  // Hooks can actually return anything
  // Added setFormData as a third returned element... callback func for updating to initial state from off of the default values
  return [formState, inputHandler, setFormData];
};

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
    case 'SET_DATA':
      return { inputs: action.inputs, isValid: action.formIsValid };
    default:
      return state;
  }
};
