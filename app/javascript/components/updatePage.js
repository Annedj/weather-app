const updateWeather = (response) => {
  const data = response.daily[0];
  const lang = window.navigator.userLanguage || window.navigator.language;

  console.log('Hello from updateW: ', data);
  const temperature = document.getElementById('temperature');
  const mainDescription = document.getElementById('main-description');
  const feels = document.getElementById('feels');
  const weatherIcon = document.getElementById('weather-icon');
  const wind = document.getElementById('wind');
  const humidity = document.getElementById('humidity');
  const sun = document.getElementById('sun').querySelectorAll('.infos');

  temperature.innerText = `${Math.round(data.temp.day) - 273}`;
  mainDescription.innerText = data.weather[0].main;
  feels.innerText = `Feels like ${Math.round(data.feels_like.day)- 273} °C`;
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
  wind.querySelector('.infos').innerText = data.wind_speed + " km/h";
  humidity.querySelector('.infos').innerText = data.humidity + "%";
  sun[0].innerText = new Date(data.sunrise*1000).toLocaleTimeString(lang, {hour: "numeric", minute: "numeric"});
  sun[1].innerText = new Date(data.sunset*1000).toLocaleTimeString(lang, {hour: "numeric", minute: "numeric"});

};

const updateCity = (data) => {
  const city = document.getElementById('city');
  city.innerText = data.city;
};

export { updateWeather, updateCity }
