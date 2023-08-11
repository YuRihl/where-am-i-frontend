import { LocationLimit } from './enums';

export async function getRandomPanorama(): Promise<google.maps.StreetViewPanoramaData> {
  const service = new window.google.maps.StreetViewService();

  const randomLocation = getRandomLocation();

  let randomPanorama: google.maps.StreetViewResponse;
  try {
    randomPanorama = await service.getPanorama({
      location: randomLocation,
      preference: google.maps.StreetViewPreference.NEAREST,
      radius: 200,
    });

    return randomPanorama.data;
  } catch (error) {
    return getRandomPanorama();
  }
}

export function getRandomLocation(): google.maps.LatLng {
  const longitude =
    Math.random() * (LocationLimit.MAX_LNG - LocationLimit.MIN_LNG) +
    LocationLimit.MIN_LNG;
  const latitude =
    Math.random() * (LocationLimit.MAX_LAT - LocationLimit.MIN_LAT) +
    LocationLimit.MIN_LAT;

  return new google.maps.LatLng(latitude, longitude);
}
