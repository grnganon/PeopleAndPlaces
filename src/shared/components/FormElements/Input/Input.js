import React, { useReducer, useEffect } from 'react';

import './Input.css';
import { validate } from '../../../util/validators';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators)
      };
    case 'TOUCH':
      return {
        // Making isTouched just to not throw error validation if user hasn't typed anything yet
        ...state,
        isTouched: true
      };
    default:
      return state;
  }
};
const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: '',
    isValid: false,
    isTouched: false
  });

  // object destructuring to have smaller dependencies for the useEffect
  const { id, onInput } = props;
  const { value, isValid } = inputState;

  // when any of the parent props, or state here changes calling the onInput provided from parent
  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, onInput, value, isValid]);

  const changeHandler = event => {
    // store and validate input as user types - dispatch to reducer state object to reset state
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: props.validators
    });
  };

  const touchHandler = () => {
    dispatch({ type: 'TOUCH' });
  };

  const element =
    props.element === 'input' ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        value={inputState.value}
        onBlur={touchHandler}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        value={inputState.value}
        onBlur={touchHandler}
      />
    );

  return (
    <div
      className={`form-control ${!inputState.isValid &&
        inputState.isTouched &&
        'form-control--invalid'}`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
