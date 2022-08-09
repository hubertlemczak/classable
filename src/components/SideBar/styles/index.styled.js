import styled from 'styled-components';

export const SideBarContainer = styled.div`
  position: fixed;
  left: 0;
  top: 100px;
  bottom: 0;
  width: 230px;
  background-color: black;
  padding: 20px;

  ul {
    display: flex;
    flex-direction: column;
    list-style: none;
    gap: 20px;
  }
`;
