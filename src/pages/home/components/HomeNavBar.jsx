import { Link, Outlet } from 'react-router-dom';
import { STRING } from '../../../utils/vars';
import { Logo, StyledHomeNavBar } from '../styles/HomeNavBar.styled';

export const HomeNavBar = () => {
  return (
    <>
      <StyledHomeNavBar>
        <nav className="container">
          <Logo>
            <Link to="/">{STRING.LOGO_NAME}</Link>
          </Logo>
          <ul>
            <li>
              <Link to="/join">{STRING.LOG_IN}</Link>
            </li>
            <li>
              <Link to="/contact">{STRING.CONTACT}</Link>
            </li>
          </ul>
        </nav>
      </StyledHomeNavBar>
      <Outlet />
    </>
  );
};
