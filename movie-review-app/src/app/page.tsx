"use client"; // Ensures this component runs on the client side in Next.js

import { Button, Box } from "@mui/material";
import { useState, useEffect } from "react";
import ColumnDisplay from "@/components/column-display";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  fetchMovies,
  fetchTvShows,
  ApiResponse,
  Movie,
  TvShow,
} from "@/utils/query";

// Generic interface for API responses containing paginated results

// Enum for selecting the display type between Movies and TV Shows
export enum DisplayType {
  Movies = "movies",
  TvShows = "tvshows",
}

export default function Home() {
  // State to track whether to display Movies or TV Shows
  const [displayType, setDisplayType] = useState<DisplayType>(
    DisplayType.Movies
  );

  // State for pagination control
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const router = useRouter();

  // Fetch movie data using React Query
  const { data: movieData, isLoading: isLoadingMovies } = useQuery<
    ApiResponse<Movie>
  >({
    queryKey: ["movies", currentPage], // Unique key for caching
    queryFn: async () => {
      const data = await fetchMovies(currentPage);
      setTotalPages(data.total_pages); // Update total page count
      return data;
    },
  });

  // Fetch TV show data using React Query
  const { data: tvShowData, isLoading: isLoadingTvShows } = useQuery<
    ApiResponse<TvShow>
  >({
    queryKey: ["tvshows", currentPage], // Unique key for caching
    queryFn: async () => {
      const data = await fetchTvShows(currentPage);
      setTotalPages(data.total_pages); // Update total page count
      return data;
    },
  });

  // Redirect to authentication page if guest session ID is missing
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("guest_session_id") === null
    ) {
      router.push("/auth");
    }
  }, [router]);

  // Handle pagination navigation
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div style={{ marginTop: 50 }}>
      {/* Buttons for switching between Movies and TV Shows */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          gap: "1rem",
          paddingTop: "2rem",
        }}
      >
        <Button
          color={displayType === DisplayType.Movies ? "primary" : "inherit"}
          onClick={() => setDisplayType(DisplayType.Movies)}
        >
          Movies
        </Button>
        <Button
          color={displayType === DisplayType.TvShows ? "primary" : "inherit"}
          onClick={() => setDisplayType(DisplayType.TvShows)}
        >
          TV Shows
        </Button>
      </Box>

      {/* Show loading message while fetching data */}
      {isLoadingMovies || isLoadingTvShows ? (
        <div>Loading...</div>
      ) : (
        <div style={{ marginTop: 20 }}>
          {displayType === DisplayType.Movies ? (
            <ColumnDisplay
              data={movieData?.results || []}
              displayType={DisplayType.Movies}
            />
          ) : (
            <ColumnDisplay
              data={tvShowData?.results || []}
              displayType={DisplayType.TvShows}
            />
          )}
        </div>
      )}

      {/* Pagination controls */}
      <Box display="flex" justifyContent="center" mt={3}>
        <Button
          variant="contained"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          sx={{ marginLeft: 2 }}
        >
          Next
        </Button>
      </Box>
    </div>
  );
}
