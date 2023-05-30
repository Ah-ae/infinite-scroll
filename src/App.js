import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import MovieList from "./pages/MovieList";
import MovieDetail from "./pages/MovieDetail";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const { results } = await (
        await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
        )
      ).json();
      setMovies((movies) => [...movies, ...results]);
    };
    fetchData();
  }, [page]);

  return (
    <Routes>
      <Route
        path="/"
        element={<MovieList movies={movies} setPage={setPage} />}
      />
      <Route path="/:id" element={<MovieDetail data={movies} />} />
    </Routes>
  );
}

export default App;
