import { useEffect, useRef } from "react";
import MovieCard from "../components/ui/MovieCard";
import styles from "./MovieList.module.css";
import { Link } from "react-router-dom";

function MovieList({ movies, setPage }) {
  const target = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1);
      }
    });

    if (target.current) observer.observe(target.current);

    return () => observer.disconnect();
  }, [movies]);

  return (
    <div className={styles.container}>
      <div className={styles.movieListGrid}>
        {movies &&
          movies.map((movie) => (
            <Link to={`/${movie.id}`}>
              <MovieCard
                id={movie.id}
                title={movie.title}
                posterPath={movie.poster_path}
              />
            </Link>
          ))}
        {movies.length > 0 && <div ref={target} />}
      </div>
    </div>
  );
}

export default MovieList;
