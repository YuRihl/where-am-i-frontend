import { Button } from '@mui/material';
import { GoogleMap, Marker } from '@react-google-maps/api';
import {
  CSSProperties,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { SocketContext } from '../../context/socket/socket.context';

interface PlainMapProps {
  onGuess: () => Promise<void>;
  userLocation: google.maps.LatLng | null;
  setUserLocation: Dispatch<SetStateAction<google.maps.LatLng | null>>;
}

const PlainMap: FC<PlainMapProps> = ({
  onGuess,
  userLocation,
  setUserLocation,
}: PlainMapProps) => {
  const socket = useContext(SocketContext);
  const { t } = useTranslation();
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isButtonHover, setIsButtonHover] = useState<boolean>(false);
  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });

  const containerStyle: CSSProperties = {
    position: 'absolute',
    top: isHover ? '22.5%' : '15%',
    left: isHover ? '15%' : '10%',
    zIndex: 9924,
    height: isHover ? '45%' : '30%',
    width: isHover ? '30%' : '20%',
    transform: 'translate(-50%, -50%)',
    opacity: isHover ? '100%' : '50%',
  };

  const buttonStyle: CSSProperties = {
    zIndex: 546,
    height: '7%',
    width: isHover ? '30%' : '20%',
    backgroundColor: isButtonHover ? '#303030' : 'black',
    marginTop: '32px',
    position: 'absolute',
    top: isHover ? '40%' : '25%',
    textDecoration: 'none',
    color: 'white',
  };

  const handleMapClick: (e: google.maps.MapMouseEvent) => void = (event) => {
    setUserLocation(event.latLng);

    if (event.latLng) {
      setCenter({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    }
  };

  return (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={2}
        options={{ disableDefaultUI: true }}
        onMouseOver={() => setIsHover(true)}
        onMouseOut={() => setIsHover(false)}
        onClick={handleMapClick}
      >
        {userLocation ? <Marker position={userLocation} /> : null}
      </GoogleMap>
      <Button
        style={buttonStyle}
        onMouseEnter={() => setIsButtonHover(true)}
        onMouseLeave={() => setIsButtonHover(false)}
        onClick={onGuess}
      >
        {t('game.plainMap.guessButton')}
      </Button>
    </>
  );
};

export default PlainMap;
