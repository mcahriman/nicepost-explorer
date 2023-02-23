import React, { useEffect, useState } from "react";
import axios from "axios";

import MovieList from "components/MoviesList";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMoviesHandler();
  }, []);

  const fetchMoviesHandler = async () => {
    setError("");
    try {
      setLoading(true);
      const result = await axios.get("https://swapi.dev/api/films/");
      setMovies(
        result.data.results.map((movie: any) => {
          return {
            id: movie.episode_id,
            title: movie.title,
            releaseDate: movie.release_date,
            openingText: movie.opening_crawl,
          };
        })
      );
      setLoading(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
      setLoading(false);
    }
  };
  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && <MovieList movies={movies} />}
      {error && <p>{error}</p>}
    </div>
  );
};

export default App;
