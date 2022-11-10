const input = document.querySelector(".nav-input");
const city = document.querySelector(".city");
const weather = document.querySelector(".weather");
const temp = document.querySelector(".temp");
const feels_like = document.querySelector(".feels-like");
const navItems = document.querySelectorAll(".nav-item")

const tempMin = document.getElementById('temp-min')
const tempMax = document.getElementById('temp-max')
const pressure = document.getElementById('pressure')
const wind = document.getElementById('wind')
const humidity = document.getElementById('humidity')
const visibility = document.getElementById('visibility')

navItems[0].classList.add('active-item')

let defaultCity = 'London,uk'

const windDirections = ['N', 'NEE', 'NE', 'EES', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'WN', 'NNW'];

async function fetchData (value = defaultCity) {
  await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=c94211c95787a1b27aa2e4ed226f63b7&units=metric`)
    .then(response => response.json())
    .then(data => {
      (data.cod !== '404') ? insertData(data) : alert(data.message)
      defaultCity = value
    })
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


function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var year = a.getFullYear();
  var month = a.getMonth();
  var date = a.getDate();
  var dayWeek = new Date(year, month, date).toString().split(' ')[0]
  console.log(dayWeek)
}
timeConverter('1668089474')


function insertData (data) {
  console.log(data)
  city.textContent = data.name;
  weather.innerHTML = data.weather[0].main;
  temp.innerHTML = Math.round(data.main.temp) + '&deg;C';
  feels_like.innerHTML = 'Feels like ' + Math.round(data.main.feels_like) + '&deg;C';
  addIconWeather(data.weather[0].icon);
  tempMin.innerHTML = 'Min: ' + Math.round(data.main.temp_min) + '&deg;C';
  tempMax.innerHTML = 'Max: ' + Math.round(data.main.temp_max) + '&deg;C';
  pressure.textContent = Math.round(data.main.pressure * 0.75) + ' mmHg';
  const windSpeed = data.wind.speed.toFixed(1) + 'm/s ';
  wind.textContent = windSpeed + calculateWindDirection(data.wind.deg);
  humidity.textContent = data.main.humidity + ' %';
  visibility.textContent = (data.visibility / 1000).toFixed(1) + ' km';
}


input.addEventListener("change", (e) => {
  (e.target.value === '') ? fetchData() : fetchData(e.target.value); //fetch data depending on the value
})