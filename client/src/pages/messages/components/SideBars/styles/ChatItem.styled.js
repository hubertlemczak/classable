import styled from 'styled-components';
import { ReactComponent as Users } from '../../../../../assets/icons/users.svg';

export const StyledUserItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.textLight};
  font-size: 1rem;
  font-weight: bold;
  width: 100%;
  cursor: pointer;
  padding: 5px;
  border-radius: 6px;
  height: 42px;
  margin-block: 14px;

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
