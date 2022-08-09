import { Outlet } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { NavLinkItem } from './components/NavLinkItem';
import { SideBarContainer } from './styles/index.styled';

const NAV_LINKS = [
  'dashboard',
  'assignments',
  'resources',
  'messages',
  'calendar',
  'classroom',
  'notes',
];

const SideBar = () => {
  return (
    <>
      <SideBarContainer>
        <ul>
          {NAV_LINKS.map(link => (
            <NavLinkItem key={uuidv4()} path={link} />
          ))}
        </ul>
      </SideBarContainer>
      <Outlet />
    </>
  );
};

export default SideBar;
