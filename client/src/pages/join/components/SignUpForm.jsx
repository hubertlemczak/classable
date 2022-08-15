import { useState } from 'react';
import FormInput from '../../../components/form/FormInput';
import { STRING } from '../../../utils/vars';

import { StyledAuthenticaionForm } from '../styles/AuthenticationForm.styled';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => setFormFields(defaultFormFields);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    resetFormFields();
  };

  return (
    <StyledAuthenticaionForm>
      <h2>{STRING.SIGN_UP.HEADER}</h2>
      <span>{STRING.SIGN_UP.SPAN}</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          required
        />

        <FormInput
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />

        <FormInput
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />

        <FormInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          required
        />
        <button>{STRING.SIGN_UP.BTN}</button>
      </form>
    </StyledAuthenticaionForm>
  );
};
