import { Outlet, useParams, useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as MovieApi from '../../services/movieApi';
import s from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();

  useEffect(() => {
    MovieApi.fetchMovieById(movieId).then(setMovie);
  }, [movieId]);

  return (
    <>
      <main>
        <Link className={s.link} to={location?.state?.from ?? '/'}>
          &lArr; Go back
        </Link>
        {movie && (
          <>
            <div className={s.wrapper}>
              <img
                className={s.img}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.original_title}
              />
              <div className={s.mainContent}>
                <h2>{movie.original_title}</h2>
                <p>User Score: {movie.vote_average}</p>
                <h3>Overview</h3>
                <p>{movie.overview}</p>
                <h3>Genres</h3>
                {movie.genres && (
                  <ul className={s.list}>
                    {movie.genres.map(el => (
                      <li key={el.id}>{el.name}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </>
        )}

        <hr />
        <p>Additional information</p>
        <Link
          className={s.link}
          to="cast"
          state={{ from: location?.state?.from ?? '/' }}
        >
          Cast
        </Link>
        <br />
        <Link
          className={s.link}
          to="reviews"
          state={{ from: location?.state?.from ?? '/' }}
        >
          Review
        </Link>
        <hr />

        <Outlet />
      </main>
    </>
  );
}
