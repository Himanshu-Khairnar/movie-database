// App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://dummyapi.online/api/movies');
        const data = await response.json();
        setMovies(data);
      } catch (err) {
        setError('Failed to fetch movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Movie Database</h1>
      </header>

      <main className="main">
        <div className="movie-grid">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <div className="image-container">
                <img
                  src={movie.image}
                  alt={movie.movie}
                  className="movie-image"
                />
                <div className="rating-badge">
                  ★ {movie.rating}
                </div>
              </div>
              <div className="movie-info">
                <h3 className="movie-title">{movie.movie}</h3>
                <a 
                  href={movie.imdb_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="imdb-link"
                >
                  View on IMDB
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;