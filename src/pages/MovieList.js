import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../components/ui/MovieCard";
import LoadingIndicator from "react-bootstrap/esm/Spinner";
import styles from "./MovieList.module.css";

function MovieList({ movies, loadMoreData, loading }) {
  const target = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) loadMoreData();
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
      {loading && (
        <div className={styles.loadingIndicatorContainer}>
          <LoadingIndicator />
        </div>
      )}
    </div>
  );
}

export default MovieList;
