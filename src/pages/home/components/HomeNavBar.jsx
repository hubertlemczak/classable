import { Link, Outlet } from 'react-router-dom';
import { Logo, StyledHomeNavBar } from '../styles/HomeNavBar.styled';

export const HomeNavBar = () => {
  return (
    <>
      <StyledHomeNavBar>
        <nav className="container">
          <Logo>
            <Link to="/">Classable</Link>
          </Logo>
          <ul>
            <li>
              <Link to="/join">Log In</Link>
            </li>
            <li>
              <Link to="/join">Contact</Link>
            </li>
          </ul>
        </nav>
      </StyledHomeNavBar>
      <Outlet />
    </>
  );
};
