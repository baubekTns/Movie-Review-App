// Function to submit a rating for a movie
export async function rateMovie(movieId: number, rating: number) {
  // Ensure this code runs only in the browser
  if (typeof window === "undefined") {
    throw new Error("localStorage is not available on the server.");
  }

  const guestSessionId = localStorage.getItem("guest_session_id");

  if (!guestSessionId) {
    throw new Error("No guest session ID found.");
  }

  // Send a POST request to rate the movie on TMDb API
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${guestSessionId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ value: rating }), // Use JSON.stringify for safety
    }
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${data.status_message}`);
  }
  return data;
}

// Function to submit a rating for a TV show
export async function rateTvShow(tvshowId: number, rating: number) {
  const guestSessionId = localStorage.getItem("guest_session_id");

  if (!guestSessionId) {
    throw new Error("No guest session ID found.");
  }

  // Send a POST request to rate the TV show on TMDb API
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${tvshowId}/rating?guest_session_id=${guestSessionId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ value: rating }),
    }
  );

  const data = await res.json();
  console.log("TMDB Response:", data);

  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${data.status_message}`);
  }

  return data;
}

export interface ApiResponse<T> {
  page: number;
  total_results: number;
  total_pages: number;
  results: T[];
}

// Interface defining a Movie object
export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  release_date: string;
}

// Interface defining a TV Show object
export interface TvShow {
  id: number;
  name: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  release_date: string;
}

// Function to fetch top-rated movies from TMDb API
export const fetchMovies = async (
  page: number
): Promise<ApiResponse<Movie>> => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
      },
    }
  );
  const json = await res.json();
  return json;
};

// Function to fetch top-rated TV shows from TMDb API
export const fetchTvShows = async (
  page: number
): Promise<ApiResponse<TvShow>> => {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
      },
    }
  );
  const json = await res.json();
  return json;
};

// Function to fetch TV show details from TMDB API
export async function fetchTvShowDetails(tvId: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${tvId}?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`, // Uses TMDB API token
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch TV Show details");
  }

  return res.json(); // Returns JSON response
}

// Function to fetch movie details from TMDb API
export async function fetchMovieDetails(movieId: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch movie details");
  }

  return res.json();
}

export async function fetchRatedMovies(guestSessionId: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?language=en-US&page=1&sort_by=created_at.asc`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
      },
    }
  );
  return res.json();
}

export async function fetchRatedTvShows(guestSessionId: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/tv?language=en-US&page=1&sort_by=created_at.asc`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
      },
    }
  );
  return res.json();
}

export async function createGuestSession() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
    },
  };

  const res = await fetch(
    "https://api.themoviedb.org/3/authentication/guest_session/new",
    options
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));

  return res;
}
