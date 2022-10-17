import { useState, useEffect, useContext, createContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import client from '../client';
import useLocalStorage from '../hooks/useLocalStorage';

const LoggedInUserContext = createContext();
export const useLoggedInUser = () => useContext(LoggedInUserContext);

export const LoggedInUserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useLocalStorage('chat-app-token', '');
  console.log(user);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function getUser() {
      try {
        const decodedToken = jwt_decode(token);

        setIsLoading(true);
        const res = await client.get(`/users/${decodedToken?.id}`);

        setUser(res.data.user);
        setIsLoading(false);
      } catch (err) {
        console.log(err);

        localStorage.setItem('chat-app-token', '');
        if (location.pathname !== '/register') {
          navigate('/login');
        }
      }
    }

    if (token) getUser();
  }, [token]);

  return (
    <LoggedInUserContext.Provider value={{ user, token, setToken }}>
      {!isLoading && children}
    </LoggedInUserContext.Provider>
  );
};

export default LoggedInUserProvider;
