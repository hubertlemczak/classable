import styled from 'styled-components';
import NAV_PATTERN from '../../../assets/nav-pattern.svg';

export const SideBarContainer = styled.div`
  min-width: 230px;
  background-color: ${({ theme }) => theme.darkBG};
  background-image: url(${NAV_PATTERN});
  background-size: 1000px;
  background-position: 50% -152px;
  padding: 120px 20px 0px 20px;
  min-height: 100vh;

  &::-webkit-scrollbar {
    display: none;
  }

  ul {
    display: flex;
    flex-direction: column;
    list-style: none;
    gap: 20px;
  }

  @media (max-width: 1280px) {
    & {
      min-width: max-content;
    }
  }
`;

export const OutletContainer = styled.div`
  overflow-y: scroll;
  margin: 100px 0px 0px 0px;
  padding: 20px;
  max-height: calc(100vh - 100px);
  width: 100%;
`;
