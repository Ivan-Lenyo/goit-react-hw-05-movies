import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as MovieApi from '../../services/movieApi';

export default function Reviews() {
  const { movieId } = useParams();
  const [reviewsData, setReviewsData] = useState([]);

  useEffect(() => {
    MovieApi.fetchReviews(movieId).then(data => {
      setReviewsData(data.results);
    });
  }, [movieId]);

  return (
    <article>
      {reviewsData.length !== 0 ? (
        <ul>
          {reviewsData.map(({ id, author, content }) => {
            return (
              <li key={id}>
                <p>Author: {author}</p>
                <p>{content}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Reviews not found!</p>
      )}
    </article>
  );
}
