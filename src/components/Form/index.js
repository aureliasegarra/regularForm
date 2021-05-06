/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';

import './styles.css';

const Form = () => {
  const [formState, setFormState] = useState({
    formValues: {
      email: '',
      password: '',
    },
    formErrors: {
      email: '',
      password: '',
    },
    formValidity: {
      email: false,
      password: false,
    },
  });

  const handleValidation = (target) => {
    const { name, value } = target;
    const fieldValidationErrors = formState.formErrors;
    const validity = formState.formValidity;
    const isEmail = name === 'email';
    const isPassword = name === 'password';
    const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    validity[name] = value.length > 0;
    fieldValidationErrors[name] = validity[name]
      ? ''
      : `Sorry 😧 ${name} is required`;

    if (validity[name]) {
      if (isEmail) {
        validity[name] = emailTest.test(value);
        fieldValidationErrors[name] = validity[name]
          ? ''
          : `👆 ${name} should be a valid email address`;
      }
      if (isPassword) {
        validity[name] = value.length >= 8;
        fieldValidationErrors[name] = validity[name]
          ? ''
          : `👆 ${name} should be 8 characters minimum`;
      }
    }

    setFormState({
      ...formState,
      formErrors: fieldValidationErrors,
      formValidity: validity,
    });
  };

  const handleChange = ({ target }) => {
    const { formValues } = formState;
    formValues[target.name] = target.value;
    setFormState({ formValues });
    handleValidation(target);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { formValues, formValidity } = formState;
    if (Object.values(formValidity).every(Boolean)) {
      // Form is valid
      console.log(formValues);
    }
    else {
      for (const key in formValues) {
        const target = {
          name: key,
          value: formValues[key],
        };
        handleValidation(target);
      }
    }
  };

  return (
    <div className="container">
      <h1 className="title">Log in Form</h1>
      <h2 className="subtitle">React Regular</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form_group">
          <label>Email address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            value={formState.formValues.email}
          />
          <div className="invalid_feedback">
            {formState.formErrors.email}
          </div>
        </div>
        <div className="form_group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
            value={formState.formValues.password}
          />
          <div className="invalid_feedback">
            {formState.formErrors.password}
          </div>
        </div>
        <button type="submit" className="btn">
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default Form;
