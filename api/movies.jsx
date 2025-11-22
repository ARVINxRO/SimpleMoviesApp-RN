export const getMovies = async ({ pageParam }) => {
  const res = await fetch(
    "https://moviesapi.ir/api/v1/movies?page=" + pageParam
  );
  if (!res.ok) {
    throw new Error("Failed to fetch Movies...");
  }
  const json = await res.json();
  return json.data;
};

export const getMovieDetails = async (movie_id) => {
  const res = await fetch("https://moviesapi.ir/api/v1/movies/" + movie_id);
  if (!res.ok) {
    throw new Error("Failed to fetch Movie Details...");
  }
  const json = await res.json();
  return json;
};

export const searchMovie = async (movie_name) => {
  const res = await fetch(
    `https://moviesapi.ir/api/v1/movies?q=${movie_name}&page=1`
  );
  if (!res.ok) {
    throw new Error("Failed to Search Movie ...");
  }
  const json = await res.json();
  return json.data;
};

export const getBookmarks = async (bookmarks) => {
  const res = await Promise.all(
    bookmarks.map(
      async (id) => await fetch("https://moviesapi.ir/api/v1/movies/" + id)
    )
  );
  const json = await Promise.all(res.map((movie) => movie.json()));
  return json;
};
