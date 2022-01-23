import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as MovieApi from '../../services/movieApi';

export default function Cast() {
  const { movieId } = useParams();
  const [actorsData, setActorsData] = useState([]);

  useEffect(() => {
    MovieApi.fetchActors(movieId).then(data => {
      setActorsData(data.cast);
    });
  }, [movieId]);

  return (
    <div>
      {actorsData.length !== 0 ? (
        <article>
          <ul>
            {actorsData.map(({ id, name, character, profile_path }) => {
              return (
                <li key={id}>
                  {profile_path ? (
                    <img
                      src={`https://www.themoviedb.org/t/p/w185${profile_path}`}
                      alt={name}
                    />
                  ) : (
                    <p>No Image</p>
                  )}
                  {character && <p>Character: {character}</p>}
                  <p>Name: {name}</p>
                </li>
              );
            })}
          </ul>
        </article>
      ) : (
        <p>Cast not found!</p>
      )}
    </div>
  );
}
