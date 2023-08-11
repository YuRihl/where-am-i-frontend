import { SxProps, Theme } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { CSSProperties, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface IPointsModalProps {
  points: number | null;
}

const style: SxProps<Theme> = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  height: '20%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const buttonStyle: CSSProperties = {
  zIndex: 546,
  height: '20%',
  width: '30%',
  backgroundColor: 'black',
  marginTop: '32px',
  position: 'absolute',
  top: '40%',
  textDecoration: 'none',
  color: 'white',
};

const PointsModal: FC<IPointsModalProps> = ({ points }) => {
  const { t } = useTranslation();

  return (
    <div>
      <Modal
        open={!!points}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {`${t('game.pointsModal.name')}  ${points} of 5000`}
          </Typography>
          <Link to={'/home'}>
            <Button style={buttonStyle}>{t('game.pointsModal.back')}</Button>
          </Link>
        </Box>
      </Modal>
    </div>
  );
};

export default PointsModal;
