import { GoogleMap } from '@react-google-maps/api';
import {
  CSSProperties,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { NAVBAR_HEIGHT } from '../../constants';
import ProgressBar from '../ProgressBar/ProgressBar';
import { getRandomPanorama } from './services';

interface GoogleStreetViewMapProps {
  setActualLocation: Dispatch<SetStateAction<google.maps.LatLng | null>>;
  // userLocation: google.maps.LatLng | null;
  // setUserLocation: Dispatch<SetStateAction<google.maps.LatLng | null>>;
}

const GoogleStreetViewMap: FC<GoogleStreetViewMapProps> = ({
  setActualLocation,
}) => {
  const [streetViewPanorama, setStreetViewPanorama] =
    useState<google.maps.StreetViewPanorama | null>(null);
  const streetViewContainerRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const onLoad = async () => {
      setIsLoading(true);
      const panorama = await getRandomPanorama();
      setIsLoading(false);

      const panoramaInstance = new window.google.maps.StreetViewPanorama(
        streetViewContainerRef.current!,
        {
          position: panorama?.location?.latLng,
          pov: { heading: 0, pitch: 0 },
          visible: true,
          enableCloseButton: false,
          linksControl: true,
          panControl: true,
          zoomControl: true,
          fullscreenControl: true,
          addressControl: false,
        }
      );

      setStreetViewPanorama(panoramaInstance);
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      setActualLocation(panorama?.location?.latLng!);
    };

    onLoad();
  }, [setActualLocation]);

  const streetViewStyles: CSSProperties = {
    width: '100vw',
    height: `calc(100vh - ${NAVBAR_HEIGHT})`,
  };

  return (
    <div style={{ position: 'relative' }}>
      <div ref={streetViewContainerRef} style={streetViewStyles} />
      {isLoading ? (
        <ProgressBar />
      ) : (
        streetViewPanorama && (
          <GoogleMap mapContainerStyle={{ display: 'none' }}></GoogleMap>
        )
      )}
    </div>
  );
};

export default GoogleStreetViewMap;
