import { updateWeather, updateCity } from './updatePage'

const button = document.getElementById('button');

export const getWeather = () => {

  button.addEventListener('click', (event) => {
    event.preventDefault();

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((data) => {
          console.log('city is: ', getCityName(data.coords));
          fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coords.latitude}&lon=${data.coords.longitude}&exclude=minutely,hourly&appid=51584be985ba7d5712771046299b7195`)
            .then((response) => response.json())
            .then(updateWeather);
        });
      } else {
        button.insertAdjacentText('beforebegin', 'Geolocation is not supported by this browser.');
      }

  });
};

const getCityName = (coordinates) => {
  fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&localityLanguage=en`)
    .then((response) => response.json())
    .then(updateCity);
};
