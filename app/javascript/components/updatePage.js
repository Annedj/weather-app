const updateWeather = response => {
  console.log(response);
  displayWeather(response);

  const days = document.querySelectorAll(".date-btn");

  if (days) {
    days.forEach(day => {
      day.addEventListener("click", event => {
        event.preventDefault();
        const day = event.currentTarget.id;
        displayWeather(response, day);
      });
    });
  }
};

const updateCity = data => {
  const city = document.getElementById("city");
  city.innerText = data.city;
};

const displayWeather = (response, day = 0) => {
  const data = response.daily[day];
  const lang = window.navigator.userLanguage || window.navigator.language;

  const temperature = document.getElementById("temperature");
  const mainDescription = document.getElementById("main-description");
  const feels = document.getElementById("feels");
  const weatherIcon = document.getElementById("weather-icon");
  const wind = document.getElementById("wind");
  const humidity = document.getElementById("humidity");
  const sun = document.getElementById("sun").querySelectorAll(".infos");

  temperature.innerText = `${Math.round(data.temp.day) - 273}`;
  mainDescription.innerText = data.weather[0].main;
  feels.innerText = `Feels like ${Math.round(data.feels_like.day) - 273} °C`;
  if (`/${data.weather[0].icon}.svg`.width == 0) {
    weatherIcon.src = `/${data.weather[0].icon}.svg`;
  } else {
    weatherIcon.src = `/${data.weather[0].icon.slice(0, 2)}d.svg`;
    // weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
  }
  wind.querySelector(".infos").innerText = data.wind_speed + " km/h";
  humidity.querySelector(".infos").innerText = data.humidity + "%";
  sun[0].innerText = new Date(data.sunrise * 1000).toLocaleTimeString(lang, {
    hour: "numeric",
    minute: "numeric"
  });
  sun[1].innerText = new Date(data.sunset * 1000).toLocaleTimeString(lang, {
    hour: "numeric",
    minute: "numeric"
  });
};

export { updateWeather, updateCity };
