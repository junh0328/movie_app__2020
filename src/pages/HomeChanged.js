import React, { useEffect, useState } from 'react';
import './Home.css';
import Movie from '../components/Movie';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_MOVIES_REQUEST } from '../reducer/movies';

const HomeChanged = () => {
  const { isLoading, movie } = useSelector((state) => state.movies);
  const [pageNumber, setPageNumber] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_MOVIES_REQUEST,
      data: pageNumber,
    });
    setPageNumber((pageNumber) => pageNumber + 1);
  }, [dispatch]);

  useEffect(() => {
    console.log('movie 객체 감지: ', movie);
  }, [movie]);

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      console.log(`pageNumber 업데이트  ${pageNumber}`);
      // 페이지 끝에 도달하면 추가 데이터를 받아온다
      dispatch({
        type: LOAD_MOVIES_REQUEST,
        data: pageNumber,
      });
      setPageNumber((pageNumber) => pageNumber + 1);
    }
  };

  useEffect(() => {
    // scroll event listener 등록
    window.addEventListener('scroll', handleScroll);
    return () => {
      // scroll event listener 해제
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pageNumber, dispatch]);

  return (
    <section className="container">
      {isLoading ? (
        <div>로딩중..</div>
      ) : (
        <div className="movies">
          {movie.map((m) => (
            <Movie
              key={m.id}
              id={m.id}
              year={m.year}
              title={m.title}
              summary={m.summary}
              poster={m.medium_cover_image}
              genres={m.genres}
            />
          ))}
        </div>
        // <div>로딩 완료!</div>
      )}
    </section>
  );
};

export default HomeChanged;
