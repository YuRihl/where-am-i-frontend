import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { CircularProgress } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { AxiosError } from 'axios';
import * as React from 'react';
import { MouseEventHandler, useContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import GoogleButton from 'react-google-button';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CurrentUserContext from '../context/user/current-user.context.ts';
import useFetch from '../hooks/use-fetch.hook';
import '../i18n.ts';

const theme = createTheme({
  components: {
    MuiTouchRipple: {
      styleOverrides: {
        root: {
          backgroundColor: 'gray',
        },
      },
    },
  },
});

// const theme = createTheme({
//   components: {
//     MuiTextField: {
//       styleOverrides: {
//         root: {
//           color: 'white',
//         },
//       },
//     },
//     MuiInputLabel: {
//       styleOverrides: {
//         root: {
//           color: 'white',
//         },
//       },
//     },
//     MuiTypography: {
//       styleOverrides: {
//         root: {
//           color: 'white',
//         },
//       },
//     },
//   },
// });

export default function SignInPage() {
  const { t } = useTranslation();
  const { executeFetch, loading, response } = useFetch(
    'http://localhost:3000/auth/signin'
  );
  const navigator = useNavigate();
  const [cookies, setCookies] = useCookies();
  const { setCurrentUser } = useContext(CurrentUserContext);

  const [emailOrUsername, setEmailOrUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let result;
    try {
      result = await executeFetch({
        method: 'POST',
        data: { emailOrUsername, password },
      });

      if (!rememberMe) {
        sessionStorage.setItem('access_token', result.accessToken);
      }
      setCookies('access_token', result.accessToken);
    } catch (error) {
      console.log('ERROR', error);
      toast.error(
        `${t('signin.response.error')}: ${
          //ts-ignore
          (error as AxiosError).response?.data?.message
        }`
      );
    }

    if (result.accessToken) {
      toast.success(t('signin.response.success'));

      const user = await executeFetch({
        url: 'http://localhost:3000/users/profile',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${
            rememberMe
              ? cookies.access_token
              : sessionStorage.getItem('access_token')
          }`,
        },
      });

      setCurrentUser!(user);

      navigator('/game');
    }
  };

  const handleGoogleSubmit: MouseEventHandler<HTMLDivElement> = async () => {
    window.location.replace('http://localhost:3000/auth/google');

    setTimeout(async () => {
      const user = await executeFetch({
        url: 'http://localhost:3000/users/profile',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.accessToken}`,
        },
      });

      setCurrentUser!(user);
    }, 5000);
  };

  return (
    <ThemeProvider theme={theme}>
      {loading ? (
        <CircularProgress />
      ) : (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {t('signin.name')}
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                mt: 1,
              }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="emailOrUsername"
                label={t('signin.emailOrUsername')}
                name="emailOrUsername"
                autoComplete="email or username"
                autoFocus
                onChange={(event) => setEmailOrUsername(event.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label={t('signin.password')}
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label={t('signin.rememberMe')}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: 'black', height: '50px' }}
              >
                {t('signin.submitName')}
              </Button>
              <GoogleButton
                style={{
                  width: '100%',
                  textTransform: 'uppercase',
                  fontSize: '0.875rem',
                  backgroundColor: 'black',
                  borderRadius: '5px',
                }}
                label={t('signup.googleSubmitName')!}
                type="dark"
                onClick={handleGoogleSubmit}
              />
              <ToastContainer />
              <Grid container>
                {/* <Grid item xs>
                  <Link to={''}>{t('signin.forgotPassword')}</Link>
                </Grid> */}
                <Grid item>
                  <Link to={'/signup'}>{t('signin.signupName')}</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      )}
    </ThemeProvider>
  );
}
