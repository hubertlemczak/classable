import styled from 'styled-components';
import { ReactComponent as Users } from '../../../../../assets/users.svg';

export const StyledChatItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  color: white;
  font-size: 1.2rem;
  width: 100%;
  cursor: pointer;
  border-top: 1px solid darkgray;
  height: 57px;

  &:hover {
    background-color: ${({ theme }) => theme.navHover};
  }

  div {
    width: 36px;
    height: 36px;
    border: 1px solid darkgray;
    border-radius: 50%;
  }
`;

export const UsersSVG = styled(Users)`
  width: 36px;
  height: 20px;
  fill: white;
`;
