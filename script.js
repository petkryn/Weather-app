const input = document.querySelector(".input");
const btn = document.querySelector(".btn");
const url = "https://api.weatherapi.com/v1/current.json";
const mainWeatherInfo = document.querySelector(".main__weather__info");
const key = "33e53c5f75d247f69fc135030251803";

btn.addEventListener("click", () => {
  fetch(`${url}?q=${input.value}&key=${key}`)
    .then((response) => response.json())
    .then((data) => {
      mainWeatherInfo.innerHTML = "";
      mainWeatherInfo.append(createTask(data));
    });
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
