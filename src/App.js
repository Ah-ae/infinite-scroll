import { useState, useEffect } from "react";
import MovieList from "./components/MovieList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNoMoreResult, setHasNoMoreResult] = useState(false);

  const fetchNextData = () => {
    if (!hasNoMoreResult) {
      setIsLoading(true);
      setPage((page) => page + 1);
    }
  };

  useEffect(() => {
    // (async () => {
    //   const { results } = await (
    //     await fetch(
    //       `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    //     )
    //   ).json();
    //   setMovies([...movies, ...results]);
    // })();

    const fetchNextPage = async () => {
      const scrollY = window.scrollY;

      const { results } = await (
        await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
        )
      ).json();
      setMovies([...movies, ...results]);

      if (results.length < 20) setHasNoMoreResult(true);
      setIsLoading(false);
      window.scrollTo(0, scrollY);
    };
    fetchNextPage();
  }, [page]);

  return (
    <div className="container">
      <MovieList
        data={movies}
        isLoading={isLoading}
        fetchNextData={fetchNextData}
      />
    </div>
  );
}

export default App;
