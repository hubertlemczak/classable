import styled, { css } from 'styled-components';

const shrinkLabelStyles = css`
  top: -14px;
  font-size: 14px;
  color: black;
`;
export const StyledFormLabel = styled.label`
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

export const StyledFormTextArea = styled.textarea`
  background: none;
  background-color: white;
  color: gray;
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border-radius: 0;
  border: none;
  border-bottom: 1px solid gray;
  margin: 25px 0;
  resize: none;

  &:focus {
    outline: none;
  }

  &:focus ~ ${StyledFormLabel} {
    ${shrinkLabelStyles}
  }
`;

export const StyledFormGroup = styled.div`
  position: relative;
  margin: 45px 0;
`;
