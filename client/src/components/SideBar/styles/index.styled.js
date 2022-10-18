import styled from 'styled-components';

export const SideBarContainer = styled.div`
  position: fixed;
  left: 0;
  top: 100px;
  bottom: 0;
  width: 230px;
  background-color: ${({ theme }) => theme.lightBG};
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
  top: 120px;
  right: 20px;
  bottom: 20px;
  left: 250px;
  border: 1px solid lightgray;
  border-radius: 6px;
  padding: 20px;
`;
