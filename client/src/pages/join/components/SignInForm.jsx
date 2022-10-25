import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../../../client';
import FormInput from '../../../components/form/FormInput';
import { useLoggedInUser } from '../../../context/LoggedInUser';
import { STRING } from '../../../utils/vars';

import { StyledAuthenticaionForm } from '../styles/AuthenticationForm.styled';

const defaultSignInFormFields = {
  email: '',
  password: '',
};

export const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultSignInFormFields);
  const [error, setError] = useState('');

  const { setToken } = useLoggedInUser();

  const { email, password } = formFields;

  const navigate = useNavigate();

  const resetFormFields = () => setFormFields(defaultSignInFormFields);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });

    if (error) {
      setError('');
    }
  };

  const handleSubmit = async e => {
    try {
      e.preventDefault();

      const res = await client.post('/login', formFields);

      saveToken(res.data.token);
    } catch (err) {
      console.error(err);
      setError('asdasdasd');
    }
  };

  const handleDemo = async () => {
    try {
      const res = await client.post('/login', {
        email: 'demo@user.com',
        password: '123',
      });

      saveToken(res.data.token);
    } catch (err) {
      console.error(err);
      setError('asdasdasd');
    }
  };

  const saveToken = token => {
    localStorage.setItem('classable-token', token);
    setToken(token);
    resetFormFields();
    navigate('/courses');
  };

  return (
    <StyledAuthenticaionForm>
      <h2>{STRING.SIGN_IN.HEADER}</h2>
      <span>
        {STRING.SIGN_IN.SPAN} or{' '}
        <span
          className="text-blue-500 underline cursor-pointer"
          onClick={handleDemo}
        >
          use demo
        </span>
      </span>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">{STRING.SIGN_IN.BTN}</button>
      </form>
    </StyledAuthenticaionForm>
  );
};
