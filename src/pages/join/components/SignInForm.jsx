import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../../../components/form/FormInput';

import { StyledAuthenticaionForm } from '../styles/AuthenticationForm.styled';

const defaultSignInFormFields = {
  email: '',
  password: '',
};

export const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultSignInFormFields);
  const { email, password } = formFields;

  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    resetFormFields();
    navigate('/courses');
  };

  const resetFormFields = () => setFormFields(defaultSignInFormFields);

  return (
    <StyledAuthenticaionForm>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
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
        <button type="submit">Sign In</button>
        <span style={{ paddingInline: 20 }}>OR</span>
        <button className="demoBtn">Use Demo</button>
      </form>
    </StyledAuthenticaionForm>
  );
};
