import styles from "./MovieCard.module.css";

function MovieCard({ id, title, posterPath }) {
  return (
    <div className={styles.movie} key={id}>
      <img
        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
        alt={`${title} poster`}
        className={styles.poster}
      />
      <h4 className={styles.title}>{title}</h4>
    </div>
  );
}

export default MovieCard;
