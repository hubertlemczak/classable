import { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import uniqid from 'uniqid';

import { useSocket } from '../../../../context/SocketProvider';
import { STRING } from '../../../../utils/vars';
import { ActiveUser } from './components/ActiveUser';

import { ChatItem } from './components/ChatItem';
import { SideBarContainer } from './styles/index.styled';

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
    <div className="flex md:m-5">
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
      <div
        className="w-full md:px-5"
        style={{ minHeight: 'calc(100vh - 180px)' }}
      >
        <Outlet />
      </div>

      <SideBarContainer>
        <ul className="pt-2.5">
          <li>Online</li>
          {activeUsers?.map(user => (
            <ActiveUser key={uniqid()} {...user} />
          ))}
          <li>Offline</li>
        </ul>
      </SideBarContainer>
    </div>
  );
};

export default SideBars;
