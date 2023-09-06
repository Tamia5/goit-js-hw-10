import axios from "axios";
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";

const selectCat = document.querySelector(".breed-select");
const catInfo = document.querySelector(".cat-info");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");

loader.classList.remove('is-hidden');
// selectCat.classList.add('is-hidden');
error.classList.add('is-hidden');
let currentBreedId = null;

fetchBreeds()
  .then(data => {
    const optionsList = data.map(({ id, name }) => `<option value="${id}">${name}</option>`).join('');
    selectCat.innerHTML = optionsList;

    new SlimSelect({
      select: selectCat
    });

  loader.classList.remove('is-hidden');
    selectCat.addEventListener("change", () => {
      const selectedBreedId = selectCat.value;
      error.style.display = "none";

      // Очищення старої інформації перед завантаженням нової породи
      catInfo.innerHTML = "";
      loader.style.display = "block";

      fetchCatByBreed(selectedBreedId)
        .then(catData => {
          loader.style.display = "none";

          if (catData.length === 0) {
            Notiflix.Notify.warning('Немає результатів для цієї породи кота.');
            return;
          }

          renderMarkupInfo(catData[0]);
        })
        .catch(error => {
          console.error("Помилка отримання інформації про кота:", error);
          Notiflix.Notify.failure('Помилка отримання інформації про кота');
          error.style.display = "block";
        });
    });
    loader.classList.add('is-hidden');
  })
  .catch(error => {
    console.error("Помилка отримання списку порід:", error);
    Notiflix.Notify.failure('Помилка отримання списку порід');
  });

function renderMarkupInfo(data) {
  const { breeds, url } = data;
  const { name, temperament, description } = breeds[0];
  const beerdCard = `
      <img class="img-cat" src="${url}" alt="${name}">
    <div class="description">
      <h2 class="cat-name">${name}</h2>
      <p>${description}</p>
      <p><span class="temperament">Temperament: </span>${temperament}</p>
    </div>
  `;

  catInfo.innerHTML = beerdCard;
}
