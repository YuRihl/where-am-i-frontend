import { FC } from 'react';
import { SocketContext, socket } from './socket.context';

export interface ISocketProviderProps {
  children: any;
}

const SocketProvider: FC<ISocketProviderProps> = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
