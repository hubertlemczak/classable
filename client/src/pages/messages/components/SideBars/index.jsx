import { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import uniqid from 'uniqid';

import { useSocket } from '../../../../context/SocketProvider';
import { STRING } from '../../../../utils/vars';
import ChatRoom from '../ChatRoom';
import { ActiveUser } from './components/ActiveUser';

import { ChatItem } from './components/ChatItem';
import { ActiveUsersContainer } from './styles/ActiveUser.styled';
import { OutletContainer, SideBarContainer } from './styles/index.styled';

const SideBars = () => {
  const [chats] = useState([
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
  const [activeUsers, setActiveUsers] = useState([]);

  const { socket } = useSocket();

  useEffect(() => {
    socket.on('online-users', users => {
      setActiveUsers(users);
    });

    socket.emit('get-online-users');

    return () => {
      socket.off('online-users');
    };
  }, []);

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
          <li>Online</li>
          {activeUsers?.map(user => (
            <ActiveUser key={uniqid()} {...user} />
          ))}
          <li>Offline</li>
        </ul>
      </ActiveUsersContainer>
      <OutletContainer>
        <ChatRoom />
        <Outlet />
      </OutletContainer>
    </>
  );
};

export default SideBars;
