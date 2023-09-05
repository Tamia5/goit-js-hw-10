import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_xsUN34O6hjz7Oll1D19EaJTNmUboxgBlJIvVNpxcRWanswxTMcEmQTssSavln7Hs";


function fetchBreeds() {
    return axios.get('https://api.thecatapi.com/v1/breeds')
        .then(response => {
            return response.data;
        })
    .catch(error => {
      throw new Error(error.message);
    });
}

function fetchCatByBreed(breedId) {
  return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
      .then(response => { 
          return response.data;  
      })
    .catch(error => {
        throw new Error(error.message);
    });
}
export { fetchBreeds, fetchCatByBreed };