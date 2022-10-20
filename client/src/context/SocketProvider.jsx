import { useEffect, useContext, createContext, useState } from 'react';
import { io } from 'socket.io-client';

import { useLoggedInUser } from './LoggedInUser';

const SocketContext = createContext();
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(false);

  const { token } = useLoggedInUser();

  useEffect(() => {
    if (!token) return;
    // eslint-disable-next-line no-undef
    const socket = io(process.env.REACT_APP_BASE_SOCKET_URL, {
      auth: { token: `Bearer ${token}` },
      withCredentials: true,
    });

    socket.on('connect', () => {
      setSocket(socket);
      console.log('connected');
    });

    socket.onAny((event, ...args) => {
      console.log(event, args);
    });

    socket.on('exception', err => {
      console.log('error', err);
    });

    socket.on('disconnect', () => {
      console.log('disconnected');
    });

    socket.on('connect_error', err => {
      console.error(err);
      if (err.message === 'invalid token') {
        localStorage.setItem('classable-token', '');
      }
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('connect_error');
      socket.off('exception');
      socket.offAny();
      socket.disconnect();
    };
  }, [token]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {socket && children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
