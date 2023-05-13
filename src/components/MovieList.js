import { useEffect } from "react";
import MovieCard from "./MovieCard";

function MovieList({ data, isLoading, fetchNextData }) {
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    // 화면 하단까지 스크롤되었고, !isLoading 이어서 요청 중이 아니라면 다음 페이지 정보 요청
    if (scrollTop + clientHeight >= scrollHeight && !isLoading) {
      fetchNextData();
    }
  };

  const throttle = (func, waits) => {
    let lastFunc; // timer id of last invocation
    let lastRan; // time stamp eof last invocation

    return (...args) => {
      const context = this;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(() => {
          if (Date.now() - lastRan >= waits) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, waits - (Date.now() - lastRan));
      }
    };
  };

  useEffect(() => {
    // const clientWidth = document.documentElement.clientWidth;
    const clientHeight = document.documentElement.clientHeight;

    // 클라이언트 화면이 영화 카드 20개(10 rows) 이상 들어가고도 남는 경우, 정보를 한 번 더 요청해서 화면을 채우도록 함
    if (clientHeight > (440 + 20) * 10) {
      fetchNextData();
    }

    // 컴포넌트 마운트시, throttle로 0.5초에 한 번씩만 동작하도록 제한
    window.addEventListener("scroll", throttle(handleScroll, 500));

    // 컴포넌트 언마운트시, scroll 이벤트에 달았던 handleScroll 함수 제거
    return () => {
      window.removeEventListener("scroll", throttle(handleScroll, 500));
    };
  }, []);

  return (
    <>
      {data &&
        data.map((movie) => (
          <MovieCard
            title={movie.title}
            posterPath={movie.poster_path}
            key={movie.id}
          />
        ))}
    </>
  );
}

export default MovieList;
