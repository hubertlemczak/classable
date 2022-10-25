import styled from 'styled-components';

const StyledSpinner = styled.div`
  border: 1px solid transparent;
  border-top: 2px solid ${({ theme }) => theme.green};
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(250deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

function Spinner({ className }) {
  return (
    <StyledSpinner className={`absolute top-1/2 right-1/2 ${className}`} />
  );
}

export default Spinner;
