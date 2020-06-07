import { updateWeather, updateCity } from './updatePage'


export const getWeatherAddress = () => {
  const inputs = document.querySelector('.inputs');
  const addressBtn = inputs.querySelector('#address-btn');
  const addressField = inputs.querySelector('#address-input');

  addressBtn.addEventListener('click', async (event) => {
    event.preventDefault();

    if (addressField.value != '') {
      const coords = await fetchCoords(addressField.value);
      const weather = await fetchWeather(coords);
      updateWeather(weather);
    };
  });
};

async function fetchCoords(address) {
  const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYW5uZWRqIiwiYSI6ImNrNmM4enMzcjB5bXozbG1nZW15MGUxZjgifQ.cVtxvDxU0wudz_k8fov_Cw`);
  const json = await response.json();
  const coordinates = await json.features[0].center;
  return coordinates;
};

async function fetchWeather(coords) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coords[1]}&lon=${coords[0]}&exclude=minutely,hourly&appid=51584be985ba7d5712771046299b7195`);
  const json = await response.json();
  console.log(json);
  return json;
};
