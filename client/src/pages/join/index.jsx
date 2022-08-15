import { SignUpForm } from './components/SignUpForm';
import { SignInForm } from './components/SignInForm';
import { StyledAuthenticationContainer } from './styles/index.styled';
import { Footer } from '../../components/Footer';

const Join = () => {
  return (
    <>
      <StyledAuthenticationContainer>
        <SignInForm />
        <SignUpForm />
      </StyledAuthenticationContainer>
      <Footer />
    </>
  );
};

export default Join;
