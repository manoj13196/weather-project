import "./styles.css";

const API_KEY = "7Q7WM9GEA8Y3VHA27H5XM4D39";

const form = document.getElementById("search-form");
const locationInput = document.getElementById("location-input");
const unitToggle = document.getElementById("unit-toggle");
const weatherContainer = document.getElementById("weather-container");

const loading = document.getElementById("loading");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const location = locationInput.value;
  const units = unitToggle.checked ? "metric" : "us";

  weatherContainer.innerHTML = "";
  loading.classList.remove("hidden");

  try {
    const res = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${units}&key=${API_KEY}&contentType=json`
    );
    const data = await res.json();

    const { temp, conditions } = data.currentConditions;
    const locationName = data.resolvedAddress;
    displayWeather({
      location: locationName,
      temp,
      conditions,
      units,
    });

    updateBackground(conditions);
  } catch (error) {
    weatherContainer.innerHTML = `<p style="color:red;"> Failed to fetch weather. Try again....`;
    console.error(error);
  } finally {
    loading.classList.add("hidden");
  }
});

function displayWeather({ location, temp, conditions, units }) {
  const unitLable = units === "metric" ? "C" : "F";

  weatherContainer.innerHTML = `
    <h2>${location}</h2>
    <p><strong>${temp}°${unitLable}</strong></p>
    <p>${conditions}</p>
    `;
}

function updateBackground(condition) {
  condition = condition.toLowerCase();

  let color = "#f0f0f0";

  if (condition.includes("rain")) {
    color = "#a4b0be";
  } else if (condition.includes("clear")) {
    color = "#ffeaa7";
  } else if (condition.includes("cloud")) {
    color = "#dfe4ea";
  } else if (condition.includes("snow")) {
    color = "#ffffff";
  } else if (condition.includes("thunder")) {
    color = "#636e72";
  }

  document.body.style.backgroundColor = color;
}
