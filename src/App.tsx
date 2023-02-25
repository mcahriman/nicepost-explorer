import React, { useEffect, useState, useCallback } from "react";
import axios, {AxiosError} from "axios";
import "./App.css";

import MovieList from "components/MoviesList";
import AddMovie from "components/AddMovie";
import { movie } from "components/types";

type Props = { moviesEndpoint: string };

const App = ({moviesEndpoint} : Props) => {
  const [movies, setMovies] = useState<movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");




  const fetchMoviesHandler = useCallback(async () => {
    setError("");
    try {
      setLoading(true);
      const result = await axios.get(moviesEndpoint);
      console.log(result);
      const loadedMovies: movie[] = [];
      for (const key in result.data) {
        loadedMovies.push( {...result.data[key], id: key} );
      }
      setMovies(loadedMovies);
      setLoading(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
      setLoading(false);
    }
  }, []);

  async function addMovieHandler(movie: movie) {
    setLoading(true);

    const response = await fetch(moviesEndpoint, {
      method: "POST",
      body: JSON.stringify(movie),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setMovies((prevMovies) => [...prevMovies, { ...movie, id: data.name }]);
    setLoading(false);
  }

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  return (
    <div>
      <AddMovie onAddMovie={addMovieHandler} />
      {loading && <p>Loading...</p>}
      {!loading && <MovieList movies={movies} />}
      {error && <p>{error}</p>}
    </div>
  );
};

export default App;
