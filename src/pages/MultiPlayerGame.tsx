import { LoadScript } from '@react-google-maps/api';
import {
  CSSProperties,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import PlainMap from '../components/PlainMap/PlainMap';
import PointsModal from '../components/PointsModal/PointsModal';
import ProgressBar from '../components/ProgressBar/ProgressBar';
import StreetViewMap from '../components/StreetViewMap/StreetViewMap';
import { Timer } from '../components/Timer/Timer';
import { SocketContext } from '../context/socket/socket.context';
import CurrentUserContext from '../context/user/current-user.context';

export default function MultiPlayerGame() {
  const { currentUser } = useContext(CurrentUserContext);
  const socket = useContext(SocketContext);
  const [userLocation, setUserLocation] = useState<google.maps.LatLng | null>(
    null
  );
  const [actualLocation, setActualLocation] =
    useState<google.maps.LatLng | null>(null);
  const [roomId, setRoomId] = useState<string>('');
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
    socket.emit('finished', { finished: true, roomId });
  };

  const onTimerExpire = async () => {
    socket.emit('result', { userLocation, actualLocation, roomId });
  };

  const handleRoomCreated = useCallback(
    (data: { roomId: string; userId: number }) => {
      console.log(`Created room ${data.roomId}`);
      setRoomId(data.roomId);
    },
    []
  );

  const handleResultReceived = useCallback((data: { points: number }) => {
    setPoints(data.points);
  }, []);

  console.log(roomId, 'ROOM ID');

  useEffect(() => {
    socket.emit('add_websocket', currentUser?.id);
    socket.emit('find_room', { userId: currentUser?.id });
  }, []);

  useEffect(() => {
    socket.on('room_created', handleRoomCreated);
    socket.on('result_received', handleResultReceived);

    return () => {
      socket.off('room_created', handleRoomCreated);
      socket.off('result_received', handleResultReceived);
    };
  }, [handleResultReceived, handleRoomCreated, socket]);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
      {socket.connected ? (
        <div style={{ position: 'relative' }}>
          <Timer style={timerStyles} onExpire={onTimerExpire} roomId={roomId} />
          <StreetViewMap setActualLocation={setActualLocation} />
          <PlainMap
            userLocation={userLocation}
            setUserLocation={setUserLocation}
            onGuess={onGuess}
          />
        </div>
      ) : (
        <ProgressBar />
      )}
      <PointsModal points={points} />
    </LoadScript>
  );
}
