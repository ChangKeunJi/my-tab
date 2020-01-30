export const displayWeather = () => {
  let long;
  let lat;
  let showDegree = document.querySelector(".weather-degree");
  let showIcon = document.querySelector(".weather-icon");
  let timezone = document.querySelector(".timezone");

  // Get Current Location

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      // DarkSky Weather Api
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/7fbf8ee8b6d702c622a1143d24123f39/${lat},${long}`;

      fetch(api)
        .then(res => res.json())
        .then(data => {
          let zone = data.timezone;
          let { temperature, summary } = data.currently;
          // Change 'F' => 'C'
          temperature = (temperature - 32) * (5 / 9);
          temperature = Math.floor(temperature);
          // Display Degree & Summary
          showDegree.textContent = temperature + " c";
          showIcon.textContent = `"${summary}"`;
          timezone.textContent = `${zone}`;
        });
    });
  }
};
