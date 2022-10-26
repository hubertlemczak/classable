import { Outlet } from 'react-router-dom';
import uniqid from 'uniqid';

import { NavLinkItem } from './components/NavLinkItem';
import { OutletContainer, SideBarContainer } from './styles/index.styled';

const NAV_LINKS = [
  'dashboard',
  'assignments',
  'resources',
  'messages',
  'calendar',
  'classroom',
];

const SideBar = () => {
  return (
    <div className="flex">
      <SideBarContainer>
        <ul>
          {NAV_LINKS.map(link => (
            <NavLinkItem key={uniqid()} path={link} />
          ))}
        </ul>
      </SideBarContainer>
      <OutletContainer>
        <Outlet />
      </OutletContainer>
    </div>
  );
};

export default SideBar;
