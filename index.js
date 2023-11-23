
document.addEventListener("DOMContentLoaded", function () {
    // Create container element
    const container = document.getElementById("countriesContainer");
  
    // Fetch data from Restcountries API
    fetch("https://restcountries.com/v3.1/all")
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then(countriesData => {
        // Loop through countriesData and create cards dynamically
        countriesData.forEach(country => {
          // Create card container
          const cardContainer = document.createElement("div");
          cardContainer.classList.add("col-lg-4", "col-sm-12");
  
          // Create card element
          const card = document.createElement("div");
          card.classList.add("card");
  
          // Create card header
          const cardHeader = document.createElement("div");
          cardHeader.classList.add("card-header");
          cardHeader.textContent = country.name.common || "Unknown";
  
          // Create card body
          const cardBody = document.createElement("div");
          cardBody.classList.add("card-body");
          cardBody.innerHTML = `<p>Capital: ${country.capital && country.capital[0] || "Unknown"}</p>
                               <p>Region: ${country.region || "Unknown"}</p>
                               <p>Country Code: ${country.cca2 || "Unknown"}</p>
                               <p>LATLNG : ${country.latlng&&country.latlng[0],country.latlng[1] || "Unknown"}</p>`;
  
          // Create button
          const button = document.createElement("button");
          button.classList.add("btn", "btn-primary");
          button.textContent = "Click for Weather";
          button.addEventListener("click", () => getWeather(country.name.common));
  
          // Append elements
          cardBody.appendChild(button);
          card.appendChild(cardHeader);
          card.appendChild(cardBody);
          cardContainer.appendChild(card);
          container.appendChild(cardContainer);
        });
      })
      .catch(error => {
        console.error('Error fetching countries data:', error);
      });
  });
  
  function getWeather(country) {
    // Fetch the weather data for the selected country from the OpenWeatherMap API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=ad10385ca9b363d8a05c4c3f692b36ee&units=metric`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then(weatherData => {
        // Display weather information in an alert for now; you can customize this part
        alert(`Weather in ${country}:\nTemperature: ${weatherData.main.temp}°C\n`);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  }
  