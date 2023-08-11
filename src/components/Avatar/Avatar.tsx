// import { Button, FormControl, SxProps, Theme, styled } from '@mui/material';
// import Avatar from '@mui/material/Avatar';
// import { FC, useContext, useState } from 'react';
// import CurrentUserContext from '../../context/user/current-user.context';
// import AvatarMenu from './AvatarMenu';

// const StyledFormControl = styled(FormControl)(({ theme }) => ({
//   margin: theme.spacing(1),
//   minWidth: 120,
// }));

// interface ICustomAvatarProps {
//   sx: SxProps<Theme>;
// }

// const CustomAvatar: FC<ICustomAvatarProps> = ({ sx }) => {
//   const { currentUser } = useContext(CurrentUserContext);
//   const [isAvatarClicked, setIsAvatarClicked] = useState<boolean>(false);

//   function stringAvatar(name: string) {
//     return {
//       sx: {
//         bgcolor: stringToColor(name),
//         ...sx,
//       },
//       children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
//     };
//   }

//   return (
//     <>
//       <Button onClick={() => setIsAvatarClicked(!isAvatarClicked)}>
//         <Avatar
//           {...stringAvatar(
//             `${currentUser?.firstName.toUpperCase()} ${currentUser?.lastName?.toUpperCase()}`
//           )}
//         />
//       </Button>
//       {isAvatarClicked && <AvatarMenu />}
//     </>
//   );
// };

// export default CustomAvatar;

import Logout from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import { Fragment, useContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import CurrentUserContext from '../../context/user/current-user.context';

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

export default function CustomAvatar() {
  const [cookies, setCookies] = useCookies();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { t } = useTranslation();

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);

    setCurrentUser!(null);
    setCookies('access_token', null);
    sessionStorage.clear();
  };

  return (
    <Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar
              {...stringAvatar(
                `${currentUser?.firstName.toUpperCase()} ${currentUser?.lastName?.toUpperCase()}`
              )}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem> */}
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {t('header.logout')}
        </MenuItem>
      </Menu>
    </Fragment>
  );
}
