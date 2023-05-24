import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styles from "./MovieDetail.module.css";

function MovieDetail({ data }) {
  const { id } = useParams();
  //   const contentRef = useRef(null);

  useEffect(() => {
    console.log("go to top");
    window.scrollTo(0, 0);
  }, []);

  //   useEffect(() => {
  //     contentRef.current.scrollIntoView({ behavior: "auto", block: "start" });
  //   }, []);

  // typeof movie.id : number
  // typeof id : string
  const movie = data.filter((movie) => movie.id == id);

  const { original_title, overview, poster_path, release_date, vote_average } =
    movie[0];

  const convertDate = (date) => {
    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth();
    const day = new Date(date).getDate();
    return `${year}. ${month + 1}. ${day}.`;
  };
  const formattedReleaseDate = convertDate(release_date);

  return (
    <div className={styles.container}>
      <h3 style={{ textAlign: "center" }}>{original_title}</h3>
      <div style={{ textAlign: "center" }}>
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={`${original_title} poster`}
          className={styles.poster}
        />
      </div>

      <ul>
        <li>
          <p>Release Date: {formattedReleaseDate}</p>
        </li>
        <li>
          <p>Rating: {vote_average}</p>
        </li>
        <li>
          <p>Overview: {overview}</p>
        </li>
      </ul>
    </div>
  );
}

export default MovieDetail;
