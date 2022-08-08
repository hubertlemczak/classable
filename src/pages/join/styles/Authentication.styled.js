import styled from 'styled-components';

export const StyledAuthenticationContainer = styled.div`
  display: flex;
  max-width: 66rem;
  justify-content: space-between;
  margin: 30px auto;
  padding-inline: 10px;

  @media (max-width: 930px) {
    & {
      gap: 50px;
      align-items: center;
      flex-direction: column;
    }
  }
`;
