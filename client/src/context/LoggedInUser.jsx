import { useState, useEffect, useContext, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import client from '../client';
import useLocalStorage from '../hooks/useLocalStorage';

const LoggedInUserContext = createContext();
export const useLoggedInUser = () => useContext(LoggedInUserContext);

export const LoggedInUserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useLocalStorage('classable-token', '');
  console.log(user);

  const navigate = useNavigate();

  useEffect(() => {
    async function getUser() {
      try {
        const decodedToken = jwt_decode(token);
        console.log(decodedToken);

        setIsLoading(true);
        const res = await client.get(`/users/${decodedToken?.id}`);

        setUser(res.data.user);
        setIsLoading(false);
      } catch (err) {
        console.log(err);

        localStorage.setItem('classable-token', '');
        navigate('/join');
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
