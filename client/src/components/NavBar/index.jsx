import { Link, Outlet } from 'react-router-dom';

import LOGO from '../../assets/logo-full.png';
import LOGOMOBILE from '../../assets/logo.png';

import { StyledHomeNavBar } from './styles/index.styled';

import { Notifications } from './components/Notifications';
import { UserIcon } from './components/UserIcon';
import useWindowSize from '../../hooks/useWindowSize';

const NavBar = () => {
  const { width } = useWindowSize();

  return (
    <>
      <StyledHomeNavBar>
        <nav>
          <Link to="/courses">
            <img
              src={width < 1280 ? LOGOMOBILE : LOGO}
              alt=""
              className={`${width < 1280 ? 'h-20' : 'h-full'} mb-2 `}
            />
          </Link>
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
