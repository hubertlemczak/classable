import { SignUpForm } from './components/SignUpForm';
import { SignInForm } from './components/SignInForm';
import { StyledAuthenticationContainer } from './styles/index.styled';

const Join = () => {
  return (
    <StyledAuthenticationContainer className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </StyledAuthenticationContainer>
  );
};

export default Join;
