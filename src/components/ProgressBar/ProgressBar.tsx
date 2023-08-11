import { Box, CircularProgress } from '@mui/material';

const ProgressBar = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        zIndex: 9999,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <CircularProgress size={75} />
    </Box>
  );
};

export default ProgressBar;
