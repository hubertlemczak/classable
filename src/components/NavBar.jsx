import { Link, Outlet } from 'react-router-dom';
import { Logo, StyledHomeNavBar } from './styles/NavBar.styled';

export const NavBar = () => {
  return (
    <>
      <StyledHomeNavBar>
        <nav>
          <Logo>
            <Link to="/">Classable</Link>
          </Logo>
          <ul>
            <li>Notifications</li>
            <li>User</li>
          </ul>
        </nav>
      </StyledHomeNavBar>
      <Outlet />
    </>
  );
};
