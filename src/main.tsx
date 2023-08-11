import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './i18n.ts';
import './index.css';
import ErrorPage from './pages/Error.tsx';
import GamePage from './pages/Game.tsx';
import HomePage from './pages/Home.tsx';
import MultiPlayerGame from './pages/MultiPlayerGame.tsx';
import RatingsPage from './pages/Ratings.tsx';
import SignInPage from './pages/SignIn.tsx';
import SignUpPage from './pages/SignUp.tsx';
import SinglePlayerGame from './pages/SinglePlayerGame.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'home',
        element: <HomePage />,
      },
      {
        path: 'signup',
        element: <SignUpPage />,
      },
      {
        path: 'signin',
        element: <SignInPage />,
      },
      { path: 'game', element: <GamePage /> },
      { path: 'game/singleplayer', element: <SinglePlayerGame /> },
      { path: 'game/multiplayer', element: <MultiPlayerGame /> },
      {
        path: 'ratings',
        element: <RatingsPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />
);
