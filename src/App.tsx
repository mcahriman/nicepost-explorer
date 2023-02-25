import React, { useState } from "react";
import axios, {AxiosError} from "axios";
import "./App.css";

import MovieList from "components/MoviesList";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = async () => {
    setLoading(true);

    try {
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
    } catch (error : any) {
      if(error instanceof AxiosError) {
        setError(error.response?.data?.error || error.message)
      }
    }
    setLoading(false);
  };
  return (
    <div className="main">
      {!isLoading && <MovieList movies={movies} />}
      {isLoading && <p>Loading...</p>}
      {error && <p>Something went wrong: {error}</p>}
      <button onClick={fetchMoviesHandler}>Fetch Movies</button>
    </div>
  );
};

export default App;
