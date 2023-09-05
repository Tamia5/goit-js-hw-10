import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";
import axios from "axios";
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

axios.defaults.headers.common["x-api-key"] = "live_xsUN34O6hjz7Oll1D19EaJTNmUboxgBlJIvVNpxcRWanswxTMcEmQTssSavln7Hs";

