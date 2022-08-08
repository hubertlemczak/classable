import styled, { css } from 'styled-components';

const shrinkLabelStyles = css`
  top: -14px;
  font-size: 14px;
  color: black;
`;

export const StyledFromInputLabel = styled.label`
  color: gray;
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;
  ${({ shrink }) => shrink && shrinkLabelStyles}
`;

export const StyledFormInput = styled.input`
  background: none;
  background-color: white;
  color: gray;
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid gray;
  margin: 25px 0;

  &:focus {
    outline: none;
  }

  &:focus ~ ${StyledFromInputLabel} {
    ${shrinkLabelStyles}
  }
`;

export const StyledFormGroup = styled.div`
  position: relative;
  margin: 45px 0;

  input[type='password'] {
    letter-spacing: 0.3em;
  }
`;
