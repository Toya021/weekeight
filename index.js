let date = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let p = document.querySelector("#the-day");
let hrs = date.getHours();
let min = date.getMinutes();
let dai = date.getDay();
p.innerHTML = `${days[dai]} ${hrs}:${min} `;

let search = document.querySelector("#search");

function refreshWeather(response) {
  let temperatureElement = document.querySelector(".maintemp");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("h1");
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;

  getForecast(response.data.city);
}

function searchCity(city) {
  let apiKey = "3oe104ta9fb0de8314f715a9bb031983";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}
function city(event) {
  event.preventDefault();
  let name = document.querySelector("h1");
  let town = document.querySelector("#city-input");

  if (town !== "") {
    searchCity(`${town.value}`);
  } else {
    alert("Insert a City name");
    searchCity("London");
  }
}

function getForecast(city) {
  let apiKey = "3oe104ta9fb0de8314f715a9bb031983";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecastHtml = "<div class='row'>";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="col weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time * 1000)}</div>

        <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(
            day.temperature.minimum
          )}º</div>
        </div>
      </div>
    `;
    }
  });

  forecastHtml = forecastHtml + `</div>`;

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
search.addEventListener("click", city);