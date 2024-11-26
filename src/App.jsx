import { useEffect, useState } from "react";
import CountUp from "react-countup";


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
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-gray-100">
      <header className="text-center py-6 bg-black shadow-lg">
        <h1 className="text-4xl font-bold">🎥 Movie Review App</h1>
      </header>

      <main className="px-6">
        <div className="flex justify-center mt-10">
          <div className="w-full max-w-lg relative">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-12 px-5 pr-12 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-700 placeholder-gray-400 text-gray-100"
              placeholder="Search for a movie..."
            />
            <button
              onClick={handleSearch}
              className="absolute right-0 top-0 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 focus:ring focus:ring-blue-400"
            >
              <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24.5 25.375L19.425 20.1188M22.1667 13.2917C22.1667 18.6304 17.988 22.9583 12.8333 22.9583C7.67868 22.9583 3.5 18.6304 3.5 13.2917C3.5 7.95291 7.67868 3.625 12.8333 3.625C17.988 3.625 22.1667 7.95291 22.1667 13.2917Z" stroke="#1E1E1E" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>

            </button>
          </div>
        </div>


        {error && (
          <div className="mt-6 text-center text-red-500">
            <p>{error}</p>
          </div>
        )}

        {movie && (
          <div className="mt-10 max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-8">
            <img
              src={movie.Poster}
              alt={`${movie.Title} Poster`}
              className="w-60 h-80 rounded-lg object-cover shadow-md"
            />
            <div>
              <h2 className="text-3xl font-bold">{movie.Title}</h2>
              <p className="text-sm text-gray-400 mt-1">{movie.Year} | {movie.Genre}</p>
              <p className="text-base mt-4">{movie.Plot}</p>

              {movie.imdbRating && (
                <div className="mt-6">
                  <p className="text-sm text-gray-400">IMDb Rating</p>
                  <div className="relative bg-gray-700 rounded-full h-4 mt-1 overflow-hidden">
                    <div
                      className="bg-blue-600 h-4 rounded-full"
                      style={{
                        width: `${(parseFloat(movie.imdbRating) / 10) * 100}%`,
                        transition: "width 1.5s ease-in-out",
                      }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-300 mt-1">
                    <CountUp
                      start={0}
                      end={parseFloat(movie.imdbRating)}
                      decimals={1}
                      duration={1.5}
                    />
                    {` / 10`}
                  </p>
                </div>
              )}

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <p><strong>Rated:</strong> {movie.Rated}</p>
                <p><strong>Director:</strong> {movie.Director}</p>
                <p><strong>Writer:</strong> {movie.Writer}</p>
                <p><strong>Actors:</strong> {movie.Actors}</p>
                <p><strong>Language:</strong> {movie.Language}</p>
                <p><strong>Country:</strong> {movie.Country}</p>
                <p><strong>Awards:</strong> {movie.Awards}</p>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-300">Other Ratings</h3>
                {movie.Ratings.map((rating, index) => {
                  let value = 0;

                  if (rating.Value.includes("%")) {
                    value = parseFloat(rating.Value.replace("%", "")) / 10;
                  } else if (rating.Value.includes("/")) {
                    const [numerator, denominator] = rating.Value.split("/").map(parseFloat);
                    value = (numerator / denominator) * 10;
                  }

                  return (
                    <div key={index} className="mt-4">
                      <div className="bg-gray-700 rounded-full h-4 relative overflow-hidden">
                        <div
                          className="bg-blue-600 h-4 rounded-full"
                          style={{
                            width: `${value * 10}%`,
                            transition: "width 1.5s ease-in-out",
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-sm text-gray-300">
                          <CountUp
                            start={0}
                            end={value * 10} // Convert value to a percentage
                            decimals={1}
                            duration={1.5}
                          />
                          {`% on ${rating.Source}`}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
