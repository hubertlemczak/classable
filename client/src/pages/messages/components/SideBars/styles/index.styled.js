import styled from 'styled-components';

export const SideBarContainer = styled.div`
  position: fixed;
  left: 250px;
  top: 120px;
  bottom: 20px;
  width: 200px;
  background-color: ${({ theme }) => theme.darkBG};
  border-radius: 6px 0 0 6px;
  z-index: 100;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  ul {
    list-style: none;
    color: white;
  }

  a {
    display: block;
    position: sticky;
    top: 0;
    background-color: ${({ theme }) => theme.darkBG};
    color: white;
    font-size: 1.8rem;
    text-align: center;
    padding: 20px;
    font-weight: bold;
    transition: color 150ms;

    &.active {
      color: ${({ theme }) => theme.greenHover};
      transition: color 150ms;
    }
  }
`;

export const OutletContainer = styled.div`
  position: fixed;
  top: 140px;
  right: 240px;
  bottom: 40px;
  left: 470px;
  border: 1px solid lightgray;
`;
