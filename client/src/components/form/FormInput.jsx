import {
  StyledFormGroup,
  StyledFormInput,
  StyledFormInputLabel,
} from './styles/FormInput.styled';

export default function FormInput({ label, ...otherProps }) {
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
}
