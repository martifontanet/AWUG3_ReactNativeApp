const API_ROOT = "https://rickandmortyapi.com/api/";
const CHARACTER = "character/";
const LOCATION = "location/";
const EPISODE = "episode/";
const API_ENDPOINT_SEARCH = "search";
const API_KEY = "eV7EZhlXZA8iHzVIxnRU34zcW3mb320J";

export async function getAllCharacter() {
  const fetchURL = `${API_ROOT}${CHARACTER}`;
  const data = fetchData(fetchURL);
  return data;
}

export async function getCharacterDetail(charID) {
  const fetchURL = `${API_ROOT}${CHARACTER}${charID}`;
  const data = fetchData(fetchURL);
  return data;
}

export async function getAllEpisode() {
  const fetchURL = `${API_ROOT}${EPISODE}`;
  const data = fetchData(fetchURL);
  return data;
}

export async function getEpisodeDetail(epiID) {
  const fetchURL = `${API_ROOT}${EPISODE}${epiID}`;
  const data = fetchData(fetchURL);
  return data;
}

export async function getAllLocation() {
  const fetchURL = `${API_ROOT}${LOCATION}`;
  const data = fetchData(fetchURL);
  return data;
}

export async function getLocationDetail(locID) {
  const fetchURL = `${API_ROOT}${LOCATION}${locID}`;
  const data = fetchData(fetchURL);
  return data;
}

export async function getSearchByString(searchString) {
  const fetchURL = `${API_ROOT}${API_ENDPOINT_SEARCH}?api_key=${API_KEY}&q=${searchString}`;
  const data = fetchData(fetchURL);
  return data;
}

export async function getGifById(id) {
  const fetchURL = `${API_ROOT}${id}?api_key=${API_KEY}`;
  const data = fetchData(fetchURL);
  return data;
}

async function fetchData(fetchURL) {
  const res = await fetch(fetchURL);
  if (!res.ok) {
    throw new Error(`${res.status}: La resposta del servidor no és correcta`);
  }
  const data = await res.json();
  return data.data;
}