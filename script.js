const input = document.querySelector(".input");
const btnDay = document.querySelector(".btn");
const mainWeatherInfo = document.querySelector(".main__weather__info");
const btnWeek = document.querySelector(".btn__week");

const urlDay = "https://api.weatherapi.com/v1/current.json";
const keyDay = "33e53c5f75d247f69fc135030251803";

const keyWeek = "95YUCEXKBE9VZZ6Y7EQWNEZXK";

btnDay.addEventListener("click", () => {
  if (input.value) {
    fetch(`${urlDay}?q=${input.value}&key=${keyDay}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error.message);
        }
        mainWeatherInfo.innerHTML = "";
        mainWeatherInfo.append(createTask(data));
      })
      .catch(
        (error) =>
          (mainWeatherInfo.innerHTML = `<p class="error__style">${error.message}</p>`)
      );
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
    const startDate = "2025-04-29";
    const endDate = "2025-05-04";
    const urlWeek = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input.value}/${startDate}/${endDate}?unitGroup=metric&include=days&key=${keyWeek}&contentType=json`;

    fetch(urlWeek)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error.message);
        }
        mainWeatherInfo.innerHTML = "";
        mainWeatherInfo.append(createWeekTask(data));
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        mainWeatherInfo.innerHTML = `<p class="error__style">${error.message}</p>`;
      });
  }
});

function createWeekTask(data) {
  const container = document.createElement("div");
  container.classList.add("week__weather");

  data.days.forEach((day) => {
    const div = document.createElement("div");
    div.classList.add("main__card");
    div.innerHTML = `
      <article class="main__card__info">
        <h3>${day.datetime}</h3>
        <p><span>City:</span> ${day.city}</p>
        <p><span>Temperature:</span> ${day.temp}°C</p>
        <p><span>Weather:</span> ${day.conditions}</p>
      </article>
    `;
    container.appendChild(div);
  });

  return container;
}
