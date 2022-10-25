import styled from 'styled-components';

const StyledButton = styled.button`
  color: white;
  cursor: pointer;
  font-size: 1rem;
  padding: 1rem 2rem;
  border-radius: 100px;
  border: none;
  background-color: ${({ theme }) => theme.green};

  &:hover {
    background-color: ${({ theme }) => theme.greenHover};
  }
`;

function Button({ children, ...otherProps }) {
  return <StyledButton {...otherProps}>{children}</StyledButton>;
}

export default Button;
