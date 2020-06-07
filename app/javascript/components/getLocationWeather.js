import { updateWeather, updateCity } from "./updatePage";

export default () => {
  const button = document.getElementById('get-location');
  const inputs = document.querySelector('.inputs');

  button.addEventListener('click', (event) => {
    event.preventDefault();
    event.target.outerHTML = `<button class="btn btn-primary round mr-2" id='loading' type="button" disabled>
      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Loading...</button>`;

    navigator.geolocation.getCurrentPosition(
      geoLocationSuccess,
      geoLocationError
    );
    document.getElementById('loading').outerHTML = `<button class='btn btn-primary round disabled mr-2'>Current location</button>`;
  });
};

const cityName = async (coordinates) => {
  const response = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&localityLanguage=en`
  );
  return await response.json();
};

const locationWeather = async (latitude, longitude) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&appid=51584be985ba7d5712771046299b7195`
  );
  return await response.json();
};

export const geoLocationSuccess = async (position) => {
  console.log('Position: ', position);
  updateCity(await cityName(position.coords));
  updateWeather(
    await locationWeather(position.coords.latitude, position.coords.longitude)
  );
};

export const geoLocationError = () =>
  // button.insertAdjacentText("beforebegin", "Not available");
  window.alert('Location not found');
