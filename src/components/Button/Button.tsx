import { styled } from '@mui/material';
import { CSSProperties, FC, MouseEventHandler } from 'react';

interface ICustomButton {
  children: any;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const StyledButton = styled('button')({
  zIndex: 546,
  height: '10%',
  width: '20%',
  backgroundColor: 'black',
  position: 'absolute',
  top: '25%',
  textDecoration: 'none',
  color: 'white',
  '&:hover': {
    backgroundColor: '#303030',
  },
});

const CustomButton: FC<ICustomButton> = ({ style, onClick, children }) => {
  return (
    <StyledButton style={style} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default CustomButton;
