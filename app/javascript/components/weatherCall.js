export const getWeather = (address) => {
  const address = "London";

  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${address}&unics=metric&appid=51584be985ba7d5712771046299b7195`)
    .then((response) => console.log(response.json()));

};
