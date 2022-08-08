import { Link, Outlet } from 'react-router-dom';
import { Logo, StyledHomeNavBar } from './styles/index.styled';
import { Notifications } from './components/Notifications';
import { UserIcon } from './components/UserIcon';

const NavBar = () => {
  return (
    <>
      <StyledHomeNavBar>
        <nav>
          <Logo>
            <Link to="/">Classable</Link>
          </Logo>
          <ul>
            <li>
              <Notifications />
            </li>
            <li>
              <UserIcon />
            </li>
          </ul>
        </nav>
      </StyledHomeNavBar>
      <Outlet />
    </>
  );
};

export default NavBar;
