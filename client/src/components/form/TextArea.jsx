import {
  StyledFormGroup,
  StyledFormTextArea,
  StyledFormLabel,
} from './styles/TextArea.styled';

const TextArea = ({ label, ...otherProps }) => {
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
};

export default TextArea;
