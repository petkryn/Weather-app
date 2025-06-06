const input = document.querySelector(".input");
const btnDay = document.querySelector(".btn");
const mainWeatherInfo = document.querySelector(".main__weather__info");
const btnWeek = document.querySelector(".btn__week");
const loader = document.querySelector(".loader");

const urlDay = "https://api.weatherapi.com/v1/current.json";
const urlWeek =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";
const keyDay = "33e53c5f75d247f69fc135030251803";

const keyWeek = "95YUCEXKBE9VZZ6Y7EQWNEZXK";

btnDay.addEventListener("click", () => {
  if (input.value) {
    loader.style.display = "flex";
    mainWeatherInfo.innerHTML = "";
    fetch(`${urlDay}?q=${input.value}&key=${keyDay}`)
      .then((response) => response.json())
      .then((data) => {
        loader.style.display = "none";
        if (data.error) {
          throw new Error(data.error.message);
        }

        mainWeatherInfo.append(createTask(data));
      })
      .catch((error) => {
        loader.style.display = "none";
        mainWeatherInfo.innerHTML = `<p class="error__style">This locality was not found</p>`;
      });
  } else {
    mainWeatherInfo.innerHTML = `<p class="error__style">Please enter the location</p>`;
  }
});

function createTask(data) {
  const div = document.createElement("div");
  div.classList.add("main__card");
  div.innerHTML = `
        <article class="main__card__info">
            <div class="title__info">
              <h2 class="main__card__title">${data.location.name}</h2>
              <p>${data.location.country}</p>
            </div>
            <div class="degree__info">
              <p class="card__temperature__info">${data.current.temp_c}</p>
              <img class="img__degree" src="img/градус цел.png" alt="foto" />
            </div>
            <img class="main__img" src="${data.current.condition.icon}" alt="foto" />
            <p class="card__weather__info">${data.current.condition.text}</p>
        </article>
          `;
  return div;
}

btnWeek.addEventListener("click", () => {
  if (input.value) {
    loader.style.display = "flex";
    mainWeatherInfo.innerHTML = "";
    const { startDate, endDate } = formatDates();

    fetch(
      `${urlWeek}/${input.value}/${startDate}/${endDate}?unitGroup=metric&include=days&key=${keyWeek}&contentType=json`
    )
      .then((response) => response.json())
      .then((data) => {
        loader.style.display = "none";
        if (data.error) {
          throw new Error(data.error.message);
        }

        mainWeatherInfo.append(createWeekTask(data));
      })
      .catch((error) => {
        loader.style.display = "none";
        console.error("Fetch error:", error);
        mainWeatherInfo.innerHTML = `<p class="error__style">This locality was not found</p>`;
      });
  } else {
    mainWeatherInfo.innerHTML = `<p class="error__style">Please enter the location</p>`;
  }
});

function createWeekTask(data) {
  const container = document.createElement("div");
  container.classList.add("week__weather");

  data.days.forEach((day) => {
    const div = document.createElement("div");
    div.classList.add("main__card");
    div.innerHTML = `
      <article class="main__card__week">
        <h3>${day.datetime}</h3>
        <p><span>City:</span> ${data.address}</p>
        <p><span>Temperature:</span> ${day.temp}°C</p>
        <p><span>Weather:</span> ${day.conditions}</p>
        <img class="week_img" src="img/${day.icon}.svg" alt="icon-weather">
      </article>
    `;
    container.appendChild(div);
  });

  return container;
}

function formatDates() {
  const today = new Date();
  const end = new Date();
  end.setDate(today.getDate() + 6);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const startDate = formatDate(today);
  const endDate = formatDate(end);
  return { startDate, endDate };
}
