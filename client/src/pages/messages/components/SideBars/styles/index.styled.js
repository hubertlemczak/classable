import styled from 'styled-components';

export const SideBarContainer = styled.div`
  min-width: 200px;
  background-color: ${({ theme }) => theme.offWhite};
  box-shadow: -1px 0px 10px lightgray;
  border-radius: 6px;
  max-height: calc(100vh - 180px);
  overflow-y: scroll;
  padding: 0 10px 10px 10px;

  &::-webkit-scrollbar {
    display: none;
  }

  ul {
    list-style: none;
    color: ${({ theme }) => theme.textLight};
  }

  a {
    display: block;
    position: sticky;
    top: 0;
    background-color: ${({ theme }) => theme.offWhite};
    color: ${({ theme }) => theme.textLight};
    font-size: 1.8rem;
    text-align: center;
    padding: 10px;
    font-weight: bold;
    transition: color 150ms;

    &.active {
      color: ${({ theme }) => theme.greenHover};
      transition: color 150ms;
    }
  }
`;

export const OutletContainer = styled.div`
  /* position: absolute;
  top: 0px;
  right: 220px;
  bottom: 0px;
  left: 220px; */
  /* background-color: ${({ theme }) => theme.offWhite}; */
  /* background-color: lightblue;
  height: calc(100vh - 140px);
  padding: 20px;

  @media (max-width: 1280px) {
    & {
      left: 220px;
    }
  } */

  min-height: calc(100% - 100px);
  background-color: blue;
  /* overflow-y: scroll; */
  /* margin-top: 100px; */
  /* max-height: calc(100vh - 100px); */
  width: 100%;
`;
