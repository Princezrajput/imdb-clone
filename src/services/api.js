const API_KEY = "d9e0b0e4";
const API_URL = "https://www.omdbapi.com/";

export const searchMovies = async (query, page = 1) => {
  const res = await fetch(
    `${API_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}`,
  );

  const data = await res.json();
  return data;
};

export const getMovieById = async (id) => {
  const res = await fetch(`${API_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
  return await res.json();
};
