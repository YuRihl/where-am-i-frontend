import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { useContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { NAVBAR_HEIGHT } from '../../constants';
import CurrentUserContext from '../../context/user/current-user.context';
import useFetch from '../../hooks/use-fetch.hook';
import CustomAvatar from '../Avatar/Avatar';
import StripeButton from '../StripeButton/StripeButton';
import LanguageList from './LanguageList';

function Navbar() {
  const { t } = useTranslation();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const navigator = useNavigate();
  const [cookies, setCookies] = useCookies();
  const { executeFetch, loading, response } = useFetch(
    'http://localhost:3000/auth/signin'
  );

  useEffect(() => {
    const onLoad = async () => {
      const user = await executeFetch({
        url: 'http://localhost:3000/users/profile',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.access_token}`,
        },
      });

      setCurrentUser!(user);
    };

    onLoad();
  }, [cookies.access_token, executeFetch, setCurrentUser]);

  return (
    <AppBar position="static">
      <Container
        maxWidth="xl"
        sx={{ height: NAVBAR_HEIGHT, backgroundColor: '#202020' }}
      >
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex', height: NAVBAR_HEIGHT },
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex' }}>
              <Button
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                }}
              >
                <Link
                  to={'/home'}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  {t('header.home')}
                </Link>
              </Button>
              <Button
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                }}
              >
                <Link
                  to={'/ratings'}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  {t('header.ratings')}
                </Link>
              </Button>
            </div>
            <div style={{ display: 'flex' }}>
              <LanguageList></LanguageList>

              {currentUser ? (
                <CustomAvatar
                // sx={{
                //   my: 2,
                //   color: 'white',
                // }}
                />
              ) : (
                <>
                  <Button
                    sx={{
                      my: 2,
                      color: 'white',
                      display: 'block',
                    }}
                  >
                    <Link
                      to={'/signup'}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      {t('header.signup')}
                    </Link>
                  </Button>
                  <Button
                    sx={{
                      my: 2,
                      color: 'white',
                      display: 'block',
                    }}
                  >
                    <Link
                      to={'/signin'}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      {t('header.signin')}
                    </Link>
                  </Button>
                </>
              )}
              <StripeButton
                sx={{
                  marginLeft: '10px',
                  color: 'white',
                  display: 'block',
                }}
              />
            </div>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
