import s from './MoviesPage.module.css';
import { Link, useLocation } from 'react-router-dom';
import * as MovieApi from '../../services/movieApi';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function MoviesPage() {
  const [searchValue, setSearchValue] = useState('');
  const [movieName, setMovieName] = useState('');
  const [serchMovies, setSearchMovies] = useState([]);
  const location = useLocation();

  const handleFormSubmit = movieName => {
    setMovieName(movieName);
  };

  const handleSearchChange = event => {
    setSearchValue(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (searchValue.trim() === '') {
      return toast.error('Please enter name of search');
    }

    handleFormSubmit(searchValue);
    setSearchValue('');
  };

  useEffect(() => {
    if (movieName === '') {
      return toast.error('Please enter name of search');
    }

    MovieApi.fetchSearchMovies(movieName).then(Data => {
      setSearchMovies(serchMovies => [...serchMovies, ...Data.results]);
    });
  }, [movieName]);

  return (
    <>
      <header className={s.searchbar}>
        <form className={s.form} onSubmit={handleSubmit}>
          <input
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search movie"
            value={searchValue}
            onChange={handleSearchChange}
          />
          <button type="submit" className={s.button}>
            Search
          </button>
        </form>
      </header>

      <ul className={s.pageList}>
        {serchMovies &&
          serchMovies.map(movie => (
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
    </>
  );
}
