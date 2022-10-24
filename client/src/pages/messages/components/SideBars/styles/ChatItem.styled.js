import styled from 'styled-components';
import { ReactComponent as Users } from '../../../../../assets/icons/users.svg';

export const StyledChatItem = styled.li`
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

export const UsersSVG = styled(Users)`
  width: 32px;
  height: 20px;
  fill: ${({ theme }) => theme.textLight}; ;
`;
