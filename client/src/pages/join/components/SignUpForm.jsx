import { useState } from 'react';
import client from '../../../client';
import Error from '../../../components/Error';
import FormInput from '../../../components/form/FormInput';
import { STRING } from '../../../utils/vars';

import { StyledAuthenticaionForm } from '../styles/AuthenticationForm.styled';

const defaultFormFields = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [error, setError] = useState('');

  const { firstName, lastName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => setFormFields(defaultFormFields);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });

    if (error) {
      setError('');
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError('Password does not match.');
    }

    const res = await client.post('/register', formFields);
    console.log(res);
    resetFormFields();
  }

  return (
    <StyledAuthenticaionForm>
      <h2>{STRING.SIGN_UP.HEADER}</h2>
      <span>{STRING.SIGN_UP.SPAN}</span>
      <form className="relative" onSubmit={handleSubmit}>
        <FormInput
          label="First Name"
          type="text"
          name="firstName"
          value={firstName}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Last Name"
          type="text"
          name="lastName"
          value={lastName}
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
        {error && <Error className="mb-6" message={error} />}
        <button>{STRING.SIGN_UP.BTN}</button>
      </form>
    </StyledAuthenticaionForm>
  );
};
