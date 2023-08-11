import { GoogleOAuthProvider } from '@react-oauth/google';
import { Suspense, useEffect } from 'react';
import { CookiesProvider } from 'react-cookie';
import { Outlet, useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import SocketProvider from './context/socket/SocketProvider';
import { CurrentUserProvider } from './context/user/CurrentUserProvider';

function App() {
  const navigator = useNavigate();

  useEffect(() => {
    navigator('/home');
  }, [navigator]);

  return (
    <SocketProvider>
      <CurrentUserProvider>
        <CookiesProvider>
          <GoogleOAuthProvider
            clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}
          >
            <Suspense fallback="...loading">
              <Navbar />
              <Outlet />
            </Suspense>
          </GoogleOAuthProvider>
        </CookiesProvider>
      </CurrentUserProvider>
    </SocketProvider>
  );
}

export default App;
