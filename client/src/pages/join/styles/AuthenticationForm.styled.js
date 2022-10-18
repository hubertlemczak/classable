import styled from 'styled-components';

export const StyledAuthenticaionForm = styled.div`
  width: clamp(320px, 49%, 500px);
  font-size: 1.3rem;

  span {
    font-size: 1rem;
  }

  button {
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
  }

  @media (max-width: 930px) {
    button,
    button ~ span {
      display: flex;
      margin: auto;
    }
  }

  h2 {
    margin: 10px 0;
    font-weight: 400;
  }
`;
