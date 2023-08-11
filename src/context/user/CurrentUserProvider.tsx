import jwt_decode from 'jwt-decode';
import { FC, useState } from 'react';
import { useCookies } from 'react-cookie';
import useFetch from '../../hooks/use-fetch.hook';
import { User } from '../../interfaces';
import CurrentUserContext from './current-user.context';
interface ICurrentUserProviderProps {
  children: any;
}

export const CurrentUserProvider: FC<ICurrentUserProviderProps> = ({
  children,
}) => {
  const [cookies, setCookies] = useCookies();
  const { executeFetch, data } = useFetch(
    'http://localhost:3000/users/profile'
  );

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const fetchCurrentUser = async () => {
    try {
      jwt_decode(cookies.access_token);
    } catch (error) {
      setCurrentUser(null);
    }

    if (!cookies.access_token) {
      setCurrentUser(null);
      return;
    }

    const user = await executeFetch({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies.access_token}`,
      },
    });
    setCurrentUser(user);
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
