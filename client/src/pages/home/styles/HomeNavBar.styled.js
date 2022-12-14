import styled from 'styled-components';

export const StyledHomeNavBar = styled.header`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.darkBG};
  height: 100px;

  * {
    color: white;
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;

    ul {
      display: flex;
      gap: 20px;
      list-style: none;
    }
  }
`;

export const Logo = styled.h1`
  font-size: 2rem;
`;
