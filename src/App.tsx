import React, { useState } from "react";
import axios from "axios";

import MovieList from "components/MoviesList";

const App = () => {
  const [movies, setMovies] = useState([]);
  const fetchMoviesHandler = async () => {
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
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <MovieList movies={movies} />
      <button onClick={fetchMoviesHandler}>Fetch Movies</button>
    </div>
  );
};

export default App;
