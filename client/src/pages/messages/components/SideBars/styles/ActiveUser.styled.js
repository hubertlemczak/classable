import styled from 'styled-components';

export const ActiveUsersContainer = styled.div`
  position: fixed;
  top: 120px;
  right: 20px;
  bottom: 20px;
  width: 200px;
  background-color: black;
  border-radius: 0 6px 6px 0;
  z-index: 100;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  ul {
    list-style: none;
  }

  a {
    display: block;
    position: sticky;
    top: 0;
    background-color: black;
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

export const StyledActiveUser = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  color: ${({ theme }) => theme.textLight};
  font-size: 1.2rem;
  width: 100%;
  cursor: pointer;
  height: 57px;

  &:hover {
    background-color: ${({ theme }) => theme.navHover};
  }

  div {
    width: 32px;
    height: 32px;
    border: 1px solid darkgray;
    border-radius: 50%;
  }
`;
