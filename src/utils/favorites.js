const FAVORITES_KEY = "favorites";

export const getFavorites = () => {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
};

export const isFavorite = (id) => {
  const favorites = getFavorites();
  return favorites.some((movie) => movie.imdbID === id);
};

export const toggleFavorite = (movie) => {
  let favorites = getFavorites();

  if (favorites.some((m) => m.imdbID === movie.imdbID)) {
    favorites = favorites.filter((m) => m.imdbID !== movie.imdbID);
  } else {
    favorites.push(movie);
  }

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};
