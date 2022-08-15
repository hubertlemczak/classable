import {
  StyledFormGroup,
  StyledFormInput,
  StyledFormInputLabel,
} from './styles/FormInput.styled';

const FormInput = ({ label, ...otherProps }) => {
  return (
    <StyledFormGroup>
      <StyledFormInput {...otherProps} />
      {label && (
        <StyledFormInputLabel shrink={otherProps.value.length}>
          {label}
        </StyledFormInputLabel>
      )}
    </StyledFormGroup>
  );
};

export default FormInput;
