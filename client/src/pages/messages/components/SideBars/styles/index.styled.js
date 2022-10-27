import styled from 'styled-components';

export const SideBarContainer = styled.div`
  min-width: 200px;
  background-color: ${({ theme }) => theme.offWhite};
  box-shadow: -1px 0px 10px lightgray;
  border-radius: 6px;
  max-height: calc(100vh - 180px);
  overflow-y: scroll;
  padding: 0 20px 20px 20px;

  @media (max-width: 768px) {
    max-height: calc(100vh - 140px);
  }

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
  min-height: calc(100% - 100px);
  background-color: blue;
  width: 100%;
`;
