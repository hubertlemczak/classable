import {
  StyledFormGroup,
  StyledFormInput,
  StyledFromInputLabel,
} from './styles/FormInput.styled';

const FormInput = ({ label, ...otherProps }) => {
  return (
    <StyledFormGroup>
      <StyledFormInput {...otherProps} />
      {label && (
        <StyledFromInputLabel shrink={otherProps.value.length}>
          {label}
        </StyledFromInputLabel>
      )}
    </StyledFormGroup>
  );
};

export default FormInput;
