var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

(async function getGeo() {
  const position = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });

  const lat = await position.coords.latitude;
  const long = await position.coords.longitude;
  let req = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=e726d5a04dca4af495e123021241306&q=${lat},${long}&days=2`
  );
  if (req.ok && 400 != req.status) {
    let weather = await req.json();
    displayCurrent(weather.location, weather.current),
      displayAnother(weather.forecast.forecastday);
  }
})();
function displayCurrent(location, current) {
  var date = new Date(location.localtime);
  document.querySelector(".today").innerHTML = `
  <div class="forecast-header d-flex justify-content-between">
  <div class="day">${days[date.getDay()]}</div>
  <div class="date">${date.getDate() + monthNames[date.getMonth()]}</div>
</div>
<div class="forecast-content">
  <div id="city">${location.name}</div>
  <div id="temperature">${current.temp_c}<sup>o</sup>C</div>
  <img src="${current.condition.icon}" alt="sun" width="90px" />
  <div class="custom">${current.condition.text}</div>
  <span>
    <img src="images/image_5.png" alt="" />
    20%
  </span>
  <span>
    <img src="images/image_4.png" alt="" />
    18km/h
  </span>
  <span>
    <img src="images/image_6.png" alt="" />
    East
  </span>
</div>
  `;
}

function displayAnother(forecastday) {
  cartona = "";
  allForecast = document.querySelectorAll(".col-md-4.forecast");
  for (var i = 0; i < forecastday.length; i++) {
    var date = new Date(forecastday[i].date);
    cartona = `
    <div class="forecast-header">
      <div class="day">${days[date.getDay()]}</div>
    </div>
    <div
      class="forecast-content d-flex flex-column justify-content-center align-items-center"
    >
      <img src="${forecastday[i].day.condition.icon}" alt="sun" />
      <div id="temperature">${forecastday[i].day.maxtemp_c}<sup>o</sup>C</div>
      <small>${forecastday[i].day.mintemp_c}<sup>o</sup>C</small>
      <div class="custom">${forecastday[i].day.condition.text}</div>
    </div>
    `;
    allForecast[i + 1].innerHTML = cartona;
  }
}
async function search(city) {
  let req = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=e726d5a04dca4af495e123021241306&q=${city}&days=2`
  );
  if (req.ok && 400 != req.status) {
    let weather = await req.json();
    displayCurrent(weather.location, weather.current),
      displayAnother(weather.forecast.forecastday);
  }
}

document.getElementById("search").addEventListener("keyup", function (e) {
  search(e.target.value);
});
