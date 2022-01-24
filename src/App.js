import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import './App.css';
import Container from './components/Container/Container';
import AppBar from './components/AppBar/AppBar';

function App() {
  const HomePage = lazy(() => import('./components/HomePage/HomePage'));
  const MovieDetailsPage = lazy(() =>
    import('./components/MovieDetailsPage/MovieDetailsPage'),
  );
  const MoviesPage = lazy(() => import('./components/MoviesPage/MoviesPage'));
  const Cast = lazy(() => import('./components/Cast/Cast'));
  const Reviews = lazy(() => import('./components/Reviews/Reviews'));

  return (
    <Container>
      <AppBar />

      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="/movies/:movieId/cast" element={<Cast />} />
            <Route path="/movies/:movieId/reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Suspense>
    </Container>
  );
}

export default App;
