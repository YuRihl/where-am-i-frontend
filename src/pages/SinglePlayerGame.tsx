import { LoadScript } from '@react-google-maps/api';
import { CSSProperties, useState } from 'react';
import PlainMap from '../components/PlainMap/PlainMap';
import PointsModal from '../components/PointsModal/PointsModal';
import StreetViewMap from '../components/StreetViewMap/StreetViewMap';
import { Timer } from '../components/Timer/Timer';
import useFetch from '../hooks/use-fetch.hook';

export default function SinglePlayerGame() {
  const { executeFetch } = useFetch('http://localhost:3000/game/result');
  const [userLocation, setUserLocation] = useState<google.maps.LatLng | null>(
    null
  );
  const [actualLocation, setActualLocation] =
    useState<google.maps.LatLng | null>(null);
  const [points, setPoints] = useState<number | null>(null);

  const timerStyles: CSSProperties = {
    fontSize: '32px',
    fontStyle: 'normal',
    marginTop: '10px',
    padding: '10px',
    zIndex: 8000,
    position: 'absolute',
    left: '50%',
    color: 'white',
    borderRadius: 100,
    backgroundColor: 'black',
  };

  const onGuess = async () => {
    const result = await executeFetch({
      method: 'GET',
      params: {
        userLocationLongitude: userLocation?.lng(),
        userLocationLatitude: userLocation?.lat(),
        actualLocationLongitude: actualLocation?.lng(),
        actualLocationLatitude: actualLocation?.lat(),
      },
    });

    setPoints(result.points);
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
      <div style={{ position: 'relative' }}>
        <Timer style={timerStyles} onExpire={onGuess} />
        <StreetViewMap setActualLocation={setActualLocation} />
        <PlainMap
          userLocation={userLocation}
          setUserLocation={setUserLocation}
          onGuess={onGuess}
        />
      </div>
      <PointsModal points={points} />
    </LoadScript>
  );
}
