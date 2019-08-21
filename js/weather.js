const weatherBtn = document.querySelector(".js-weather-btn");
const weatherH1 = document.querySelector(".js-weather-h1");
const API_KEY = "a93ce74921ead0470f0befdcf1e1f566";
const COORD = "coord";

function handleClick(event) {
  event.preventDefault();
  const loadedCoord = localStorage.getItem(COORD);
  if (loadedCoord === null) {
    getCoord();
  } else {
    const parsedCoord = JSON.parse(loadedCoord);
    getWeather(parsedCoord);
  }
}

function paintWeather(weather) {
  weatherBtn.classList.remove(SHOW);
  weatherBtn.classList.add(HIDE);
  weatherH1.classList.remove(HIDE);
  weatherH1.classList.add(SHOW);
  weatherH1.innerText = `${weather.city} in ${weather.country} temp:${
    weather.temperature
  }'C humidity:${weather.humidity}%`;
}

function getWeather(coords) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${
      coords.latitude
    }&lon=${coords.longitude}&appid=${API_KEY}&units=metric`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      const country = json.sys.country;
      const city = json.name;
      const temperature = json.main.temp;
      const humidity = json.main.humidity;
      const wearherObj = {
        country,
        city,
        temperature,
        humidity
      };
      paintWeather(wearherObj);
    });
}

function getSuccess(position) {
  console.log(position);
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordObj = {
    latitude,
    longitude
  };
  saveCoords(coordObj);
  getWeather(coordObj);
}

function saveCoords(coords) {
  localStorage.setItem(COORD, JSON.stringify(coords));
}

function getError(err) {
  console.log(`failed get location ${err}`);
}

function getCoord() {
  navigator.geolocation.getCurrentPosition(getSuccess, getError);
}

function init() {
  weatherBtn.addEventListener("click", handleClick);
}

init();
