import { useEffect } from "react";
import MovieCard from "../components/MovieCard";
import LoadingIndicator from "../components/LoadingIndicator";
import styles from "./MovieList.module.css";
import { Link } from "react-router-dom";

function MovieList({ data, isLoading, fetchNextData }) {
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    // * 첫번째로 했을 때는 더이상 로딩 안되는데 두번째로 하면 로딩 더 됨
    // const isScrollEnd =
    //   window.innerHeight + window.scrollY >= document.body.offsetHeight;
    const isScrollEnd = scrollTop + clientHeight >= scrollHeight;

    // 화면 하단까지 스크롤되었고, !isLoading 이어서 현재 요청 중이 아니라면 다음 페이지 정보 요청
    if (isScrollEnd && !isLoading) fetchNextData();
  };

  const throttle = (callback, waits) => {
    let lastCallback; // timer id of last invocation
    let lastRan; // time stamp of last invocation

    return (...args) => {
      const context = this;
      if (!lastRan) {
        callback.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastCallback);
        lastCallback = setTimeout(() => {
          if (Date.now() - lastRan >= waits) {
            callback.apply(context, args);
            lastRan = Date.now();
          }
        }, waits - (Date.now() - lastRan));
      }
    };
  };

  useEffect(() => {
    const clientHeight = document.documentElement.clientHeight;
    const MOVIE_CARD_HEIGHT = 440;
    const GRID_GAP_HEIGHT = 20;

    // 클라이언트 화면이 영화 카드 20개(10 rows) 이상 들어가고도 남는 경우, 정보를 한 번 더 요청해서 화면을 채우도록 함
    if (clientHeight > (MOVIE_CARD_HEIGHT + GRID_GAP_HEIGHT) * 10) {
      fetchNextData();
    }

    // 컴포넌트 마운트시, throttle로 0.5초에 한 번씩만 동작하도록 제한
    window.addEventListener("scroll", throttle(handleScroll, 500));

    // 컴포넌트 언마운트시, scroll 이벤트에 달았던 handleScroll 함수 제거
    return () => {
      window.removeEventListener("scroll", throttle(handleScroll, 500));
    };
  }, [fetchNextData]);

  return (
    <div className={styles.container}>
      <div className={styles.movieListGrid}>
        {data &&
          data.map((movie) => (
            <Link to={`/${movie.id}`}>
              <MovieCard
                key={movie.id}
                title={movie.title}
                posterPath={movie.poster_path}
              />
            </Link>
          ))}
      </div>
      {isLoading && (
        <div className={styles.loadingIndicatorContainer}>
          <LoadingIndicator />
        </div>
      )}
    </div>
  );
}

export default MovieList;
