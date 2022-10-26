import { Link, Outlet } from 'react-router-dom';

import LOGO from '../../../assets/logo-full.png';
import LOGOMOBILE from '../../../assets/logo.png';
import useWindowSize from '../../../hooks/useWindowSize';

import { STRING } from '../../../utils/vars';
import { StyledHomeNavBar } from '../styles/HomeNavBar.styled';

export const HomeNavBar = () => {
  const { width } = useWindowSize();

  return (
    <>
      <StyledHomeNavBar>
        <nav className="container">
          <Link to="/">
            <img
              src={width < 1280 ? LOGOMOBILE : LOGO}
              alt=""
              className={`${width < 1280 ? 'h-20' : 'h-full'} mb-2`}
            />
          </Link>
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
