const API_KEY = "d9e0b0e4";
const API_URL = "https://www.omdbapi.com/";

export const searchMovies = async (query) => {
  const res = await fetch(`${API_URL}?apikey=${API_KEY}&s=${query}`);
  const data = await res.json();
  return data;
};

export const getMovieById = async (id) => {
  const res = await fetch(`${API_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
  return await res.json();
};
