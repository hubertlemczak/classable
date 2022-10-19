import styled from 'styled-components';

export const SideBarContainer = styled.div`
  position: fixed;
  left: 0;
  top: 100px;
  bottom: 0;
  width: 230px;
  background-color: ${({ theme }) => theme.darkBG};
  padding: 20px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  ul {
    display: flex;
    flex-direction: column;
    list-style: none;
    gap: 20px;
  }
`;

export const OutletContainer = styled.div`
  position: fixed;
  overflow-y: scroll;
  top: 120px;
  right: 20px;
  bottom: 20px;
  left: 250px;
  padding: 20px;
`;
