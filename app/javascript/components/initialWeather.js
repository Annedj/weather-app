import { geoLocationSuccess, geoLocationError } from './getLocationWeather';

export default () => {
  navigator.geolocation.getCurrentPosition(
    geoLocationSuccess,
    geoLocationError
  );
};
