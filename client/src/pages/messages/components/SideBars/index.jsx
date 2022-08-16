import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import uniqid from 'uniqid';
import { STRING } from '../../../../utils/vars';
import { ActiveUser } from './components/ActiveUser';

import { ChatItem } from './components/ChatItem';
import { ActiveUsersContainer } from './styles/ActiveUser.styled';
import { OutletContainer, SideBarContainer } from './styles/index.styled';

const SideBars = () => {
  const [chats, setChats] = useState([
    'general',
    'user',
    'user',
    'user',
    'user',
    'user',
    'user',
    'user',
    'user',
    'user',
    'user',
    'user',
    'user',
    'user',
    'user',
  ]);

  return (
    <>
      <SideBarContainer>
        <NavLink to="tickets">
          <p>{STRING.TICKETS}</p>
        </NavLink>
        <ul>
          {chats?.map(chat => (
            <ChatItem key={uniqid()} chat={chat} />
          ))}
        </ul>
      </SideBarContainer>
      <ActiveUsersContainer>
        <ul>
          {chats?.map(chat => (
            <ActiveUser key={uniqid()} chat={chat} />
          ))}
        </ul>
      </ActiveUsersContainer>
      <OutletContainer>
        <Outlet />
      </OutletContainer>
    </>
  );
};

export default SideBars;
