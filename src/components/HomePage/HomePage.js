import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as MovieApi from '../../services/movieApi';
import s from './HomePage.module.css';

export default function HomePage() {
  const [trendMovies, setTrendMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    MovieApi.fetchTrendMovies().then(Data => {
      setTrendMovies(trendMovies => [...trendMovies, ...Data.results]);
    });
  }, []);

  return (
    <div className={s.wrapper}>
      <h1 className={s.pageTitle}>Trending today</h1>
      <ul className={s.pageList}>
        {trendMovies &&
          trendMovies.map(movie => (
            <li key={movie.id} className={s.pageItem}>
              <Link
                className={s.link}
                to={`/movies/${movie.id}`}
                state={{ from: location }}
              >
                {movie.title}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
