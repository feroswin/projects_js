const input = document.querySelector(".nav-input");
const city = document.querySelector(".city");
const weather = document.querySelector(".weather");
const temp = document.querySelector(".temp");
const feels_like = document.querySelector(".feels-like");
const navItems = document.querySelectorAll(".nav-item")

navItems[0].classList.toggle('active-item')

const defaultCity = 'London,uk'

const windDirections = ['N', 'NEE', 'NE', 'EES', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'WN', 'NNW'];

function fetchData (value = defaultCity) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=c94211c95787a1b27aa2e4ed226f63b7&units=metric`)
    .then(response => response.json())
    .then(data => insertData(data))
}
fetchData();  // fetch default data


function addIconWeather(idIcon) {
  const iconWeather = document.createElement("img");
  iconWeather.setAttribute("src", `http://openweathermap.org/img/wn/${idIcon}@2x.png`);
  iconWeather.classList.add("icon-weather");
  weather.append(iconWeather); // add icon received from API
}


function calculateWindDirection(windDeg) {
  return windDirections[Math.round(windDeg/22.5)];
}


// function calculateTimeStamp (stamp) {
//   const seconds = stamp - (Math.round(stamp/86400)*86400);
//   let hours = Math.round(seconds / 3600);
//   let minutes = Math.round((seconds-(hours * 3600))/60);
//   if (hours < 10) hours = '0' + hours;
//   if (minutes < 10) minutes = '0' + minutes;
//   return [hours, minutes].join(':');
// }


function insertData (data) {
  console.log(data)
  city.textContent = data.name;
  weather.innerHTML = data.weather[0].main;
  temp.innerHTML = Math.round(data.main.temp) + '&deg;C';
  feels_like.innerHTML = 'Feels like ' + Math.round(data.main.feels_like) + '&deg;C';
  addIconWeather(data.weather[0].icon);
  document.getElementById('temp-min').innerHTML = 'Min: ' + Math.round(data.main.temp_min) + '&deg;C';
  document.getElementById('temp-max').innerHTML = 'Max: ' + Math.round(data.main.temp_max) + '&deg;C';
  document.getElementById('pressure').textContent = Math.round(data.main.pressure * 0.75) + ' mmHg';
  const windDirection = calculateWindDirection(data.wind.deg);
  const windSpeed = data.wind.speed.toFixed(1) + 'm/s ';
  document.getElementById('wind').textContent = windSpeed + windDirection;
  document.getElementById('humidity').textContent = data.main.humidity + ' %';
  document.getElementById('visibility').textContent = (data.visibility / 1000).toFixed(1) + ' km';
}


input.addEventListener("change", (e) => {
  (e.target.value === '') ? fetchData() : fetchData(e.target.value); //fetch data depending on the value
})