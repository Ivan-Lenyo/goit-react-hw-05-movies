const API_KEY = '9a9d5e75582b6d23ad7eb3a557c90c92';
const BASE_URL = 'https://api.themoviedb.org/3';

async function fetchWithErrorHandling(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}

export function fetchTrendMovies() {
  return fetchWithErrorHandling(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`,
  );
}

export function fetchSearchMovies(searchValue) {
  return fetchWithErrorHandling(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchValue}`,
  );
}

export function fetchMovieById(movie_id) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movie_id}?api_key=${API_KEY}`,
  );
}

export function fetchActors(movie_id) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movie_id}/credits?api_key=${API_KEY}`,
  );
}

export function fetchReviews(movie_id) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movie_id}/reviews?api_key=${API_KEY}`,
  );
}
