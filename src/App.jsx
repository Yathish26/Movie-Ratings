import React, { useState } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");

  const fetchMovie = async () => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?t=${title}&apikey=f053f694`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setMovie(data);
        console.log(data)
        setError("");
      } else {
        setMovie(null);
        setError(data.Error);
      }
    } catch (err) {
      setError("An error occurred while fetching the movie.");
    }
  };

  const handleSearch = () => {
    if (title.trim() === "") {
      setError("Please enter a movie title.");
      return;
    }
    fetchMovie();
  };

  return (
    <div>
      <h1>Movie Review App</h1>
      <p>Find reviews and details about your favorite movies.</p>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter movie title"
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {movie && (
        <div>
          <h2>{movie.Title}</h2>
          <img src={movie.Poster} alt={movie.Title} />
          <p><strong>Year:</strong> {movie.Year}</p>
          <p><strong>Rated:</strong> {movie.Rated}</p>
          <p><strong>Released:</strong> {movie.Released}</p>
          <p><strong>Runtime:</strong> {movie.Runtime}</p>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Writer:</strong> {movie.Writer}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
          <p><strong>Language:</strong> {movie.Language}</p>
          <p><strong>Country:</strong> {movie.Country}</p>
          <p><strong>Awards:</strong> {movie.Awards}</p>
          {movie.Ratings && (
            <p>
              <strong>Ratings:</strong>{" "}
              {movie.Ratings.map((rating, index) => (
                <span key={index}>
                  {rating.Source}: {rating.Value}
                  {index < movie.Ratings.length - 1 && ", "}
                </span>
              ))}
            </p>
          )}
          <p><strong>Metascore:</strong> {movie.Metascore}</p>
          <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
          <p><strong>IMDB Votes:</strong> {movie.imdbVotes}</p>
          <p><strong>IMDB ID:</strong> {movie.imdbID}</p>
          <p><strong>Type:</strong> {movie.Type}</p>
          {movie.Type === "series" && (
            <p><strong>Total Seasons:</strong> {movie.totalSeasons}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
