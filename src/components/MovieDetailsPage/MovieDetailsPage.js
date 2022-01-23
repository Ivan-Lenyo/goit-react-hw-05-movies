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
      <Link to={location?.state?.from ?? '/'}>&lArr; Go back</Link>
      {movie && (
        <>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.original_title}
          />
          <h2>{movie.original_title}</h2>
          <p>User Score: {movie.vote_average}</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          {movie.genres && (
            <ul>
              {movie.genres.map(el => (
                <li key={el.id}>{el.name}</li>
              ))}
            </ul>
          )}
        </>
      )}
      <hr />
      <p>Additional information</p>
      <Link to="cast" state={{ from: location?.state?.from ?? '/' }}>
        Cast
      </Link>
      <br />
      <Link to="reviews" state={{ from: location?.state?.from ?? '/' }}>
        Review
      </Link>
      <hr />

      <Outlet />
    </>
  );
}
