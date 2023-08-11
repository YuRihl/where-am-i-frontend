/* eslint-disable @typescript-eslint/no-empty-function */
import { Dispatch, SetStateAction, createContext } from 'react';
import { User } from '../../interfaces';

export const CurrentUserContext = createContext<{
  currentUser: User | null;
  setCurrentUser: Dispatch<SetStateAction<User | null>> | null;
}>({ currentUser: null, setCurrentUser: null });

export default CurrentUserContext;
