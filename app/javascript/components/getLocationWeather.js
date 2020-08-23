import { updateWeather, updateCity } from "./updatePage";

export default () => {
  const button = document.getElementById("get-location");
  const inputs = document.querySelector(".inputs");

  if (button) {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.target.outerHTML = `<button class="btn btn-primary round mr-2" type="button" disabled>
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Loading...</button>`;

      navigator.geolocation.getCurrentPosition(
        geoLocationSuccess(inputs),
        geoLocationError(button)
      );
    });
  }
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

const geoLocationSuccess = (inputs) => async (position) => {
  updateCity(await cityName(position.coords));
  updateWeather(
    await locationWeather(position.coords.latitude, position.coords.longitude)
  );
  inputs.outerHTML = "";
};

const geoLocationError = (button) =>
  button.insertAdjacentText("beforebegin", "Not available");
