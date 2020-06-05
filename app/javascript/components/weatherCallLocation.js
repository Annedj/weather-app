import { updateWeather, updateCity } from './updatePage'

const button = document.getElementById('get-location');
const inputs = document.querySelector('.inputs');

export const getWeatherLocation = () => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    event.target.outerHTML = `<button class="btn btn-primary round mr-2" type="button" disabled>
  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  Loading...
</button>`;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((data) => {
          getCityName(data.coords);
          fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coords.latitude}&lon=${data.coords.longitude}&exclude=minutely,hourly&appid=51584be985ba7d5712771046299b7195`)
            .then((response) => response.json())
            .then(updateWeather)
            .then(inputs.outerHTML = '')
        });
      } else {
        button.insertAdjacentText('beforebegin', 'Geolocation is not supported by this browser.');
      };
  });
};

const getCityName = (coordinates) => {
  fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&localityLanguage=en`)
  // fetch(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.latitude},${coordinates.longitude}&sensor=true`)
    .then((response) => response.json())
    .then(updateCity);
};