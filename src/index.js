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
selectCat.classList.add('is-hidden');
error.classList.add('is-hidden');

fetchBreeds()
  .then(data => {
    const optionsList = data.map(({ id, name }) => `<option value="${id}">${name}</option>`).join('');
    selectCat.innerHTML = optionsList;

    new SlimSelect({
      select: selectCat
    });

    loader.classList.add('is-hidden');
    selectCat.classList.remove('is-hidden');
  })
  .catch(error => {
    console.error("Помилка отримання списку порід:", error);
    Notiflix.Notify.Failure('Помилка отримання списку порід');
  });

selectCat.addEventListener("change", () => {
  const selectedBreedId = selectCat.value;
  loader.style.display = "block";
  error.style.display = "none";

  fetchCatByBreed(selectedBreedId)
    .then(catData => {
      loader.style.display = "none";

      if (catData.length === 0) {
        Notiflix.Notify.Warning('Немає результатів для цієї породи кота.');
        return;
      }

      renderMarkupInfo(catData[0]);
    })
    .catch(error => {
      console.error("Помилка отримання інформації про кота:", error);
      Notiflix.Notify.Failure('Помилка отримання інформації про кота');
      error.style.display = "block";
    });
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
