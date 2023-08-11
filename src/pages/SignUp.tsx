import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { CircularProgress } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { AxiosError } from 'axios';
import { FormEvent, MouseEventHandler, useContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import GoogleButton from 'react-google-button';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CurrentUserContext from '../context/user/current-user.context';
import useFetch from '../hooks/use-fetch.hook';

const theme = createTheme();

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

export default function SignUpPage() {
  const { t } = useTranslation();
  const { executeFetch, loading, response } = useFetch(
    'http://localhost:3000/auth/signup'
  );
  const navigator = useNavigate();
  const [cookies, setCookies] = useCookies();
  const { setCurrentUser } = useContext(CurrentUserContext);

  const [username, setUsername] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let result;
    try {
      result = await executeFetch({
        method: 'POST',
        data: { username, firstName, lastName, email, password },
      });
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
          Authorization: `Bearer ${cookies.access_token}`,
        },
      });

      setCurrentUser!(user);

      navigator('/game');
    } else toast(t('signin.response.error'));
  };

  // const handleGoogleSubmit = async (credentialResponse: CredentialResponse) => {
  //   console.log(credentialResponse);

  //   const result = await executeFetch({
  //     url: 'http://localhost:3000/auth/google/callback',
  //     method: 'GET',
  //   });

  //   console.log(result);
  // };

  const handleGoogleSubmit: MouseEventHandler<HTMLDivElement> = async () => {
    window.location.replace('http://localhost:3000/auth/google');
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
              {t('signup.name')}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label={t('signup.username')}
                    name="username"
                    autoComplete="username"
                    autoFocus
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label={t('signup.firstName')}
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label={t('signup.lastName')}
                    name="lastName"
                    autoComplete="family-name"
                    onChange={(event) => setLastName(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label={t('signup.email')}
                    name="email"
                    autoComplete="email"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label={t('signup.password')}
                    type="password"
                    id="password"
                    autoComplete="password"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: 'black', height: '50px' }}
              >
                {t('signup.submitName')}
              </Button>
              {/* <GoogleLogin
                onSuccess={handleGoogleSubmit}
                onError={handleGoogleError}
              /> */}
              <GoogleButton
                style={{
                  width: '100%',
                  backgroundColor: 'black',
                  borderRadius: '5px',
                }}
                label={t('signup.googleSubmitName')!}
                type="dark"
                onClick={handleGoogleSubmit}
              />
              <ToastContainer />
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to={'/signin'}>{t('signup.signinName')}</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      )}
    </ThemeProvider>
  );
}
