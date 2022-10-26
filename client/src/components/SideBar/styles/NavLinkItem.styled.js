import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const StyledNavLink = styled(NavLink)`
  border-radius: 100px;
  padding: 0.4em 1em;
  color: white;
  font-size: 1.2rem;
  display: flex;
  width: fit-content;
  align-items: center;
  gap: 10px;

  &:hover {
    background-color: ${({ theme }) => theme.navHover};
  }

  &.active {
    font-weight: bold;

    svg {
      fill: ${({ theme }) => theme.greenHover};
    }
  }

  svg {
    width: 20px;
    height: 20px;
    fill: white;
  }

  @media (max-width: 1280px) {
    span {
      display: none;
    }
  }
`;
