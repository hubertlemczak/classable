import {
  StyledFormGroup,
  StyledFormTextArea,
  StyledFormLabel,
} from './styles/TextArea.styled';

export default function TextArea({ label, ...otherProps }) {
  return (
    <StyledFormGroup>
      <StyledFormTextArea {...otherProps} />
      {label && (
        <StyledFormLabel shrink={otherProps.value.length}>
          {label}
        </StyledFormLabel>
      )}
    </StyledFormGroup>
  );
}
