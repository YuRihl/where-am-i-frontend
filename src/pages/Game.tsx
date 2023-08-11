import { MouseEventHandler, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import CustomButton from '../components/Button/Button';
import { NAVBAR_HEIGHT } from '../constants';
import CurrentUserContext from '../context/user/current-user.context';

// const SinglePlayerButton = styled('div')({
//   '&:hover': {
//     content: '""',
//     display: 'block',
//     position: 'relative',
//     top: 0,
//     left: 0,
//     bottom: 0,
//     right: 0,
//     width: '100%',
//     height: '100%',
//     backgroundImage: `url(${singlePlayerImage})`,
//     backgroundRepeat: 'no-repeat',
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     opacity: 0.4,
//     zIndex: 55,
//   },
// });

export default function GamePage() {
  const { currentUser } = useContext(CurrentUserContext);
  const { t } = useTranslation();
  const navigator = useNavigate();

  const handleMultiplayerButtonClick: MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    if (!currentUser) {
      navigator('/signin');
    }
  };

  return (
    <>
      <CustomButton
        style={{
          height: `calc(100vh - ${NAVBAR_HEIGHT})`,
          top: '11%',
          width: '50%',
        }}
      >
        <Link
          to={'singleplayer'}
          style={{ textDecoration: 'none', color: 'inherit', fontSize: 48 }}
        >
          {t('game.singleplayerButton')}
        </Link>
      </CustomButton>

      <CustomButton
        style={{
          height: `calc(100vh - ${NAVBAR_HEIGHT})`,
          top: '11%',
          left: '50%',
          width: '50%',
        }}
        onClick={handleMultiplayerButtonClick}
      >
        <Link
          to={'multiplayer'}
          style={{ textDecoration: 'none', color: 'inherit', fontSize: 48 }}
        >
          {t('game.multiplayerButton')}
        </Link>
      </CustomButton>
    </>
  );
}
