import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../../../components/form/FormInput';
import { STRING } from '../../../utils/vars';

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
      <h2>{STRING.SIGN_IN.HEADER}</h2>
      <span>{STRING.SIGN_IN.SPAN}</span>
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
        <span style={{ paddingInline: 20 }}>OR</span>
        <button className="demoBtn">Use Demo</button>
      </form>
    </StyledAuthenticaionForm>
  );
};
