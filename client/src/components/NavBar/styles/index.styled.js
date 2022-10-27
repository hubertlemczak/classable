import styled from 'styled-components';
import NAV_PATTERN from '../../../assets/nav-pattern.svg';

export const StyledHomeNavBar = styled.header`
  position: fixed;
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.darkBG};
  height: 100px;
  background-image: url(${NAV_PATTERN});
  background-size: 1000px;
  z-index: 200;
  background-position: 669px 1110px;

  @media (max-width: 1280px) {
    & {
      background-position: 609px 1110px;
    }
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding-inline: 36px;

    @media (max-width: 1280px) {
      & {
        padding-inline: 10px;
      }
    }

    & > ul {
      display: flex;
      align-items: center;
      gap: 20px;
      list-style: none;
    }
  }
`;
