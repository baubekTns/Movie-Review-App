"use client";
import { useEffect, useState } from "react";
import { DisplayType } from "../page";
import { notFound } from "next/navigation";
import ColumnDisplay from "@/components/column-display";
import { Container, Paper, Typography } from "@mui/material";
import { fetchRatedMovies, fetchRatedTvShows } from "../../utils/query";

export default function Rated() {
  const [ratedMovies, setRatedMovies] = useState<any>(null);
  const [ratedTvShows, setRatedTvShows] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [guestSessionId, setGuestSessionId] = useState<string | null>(null);

  useEffect(() => {
    // Get guest session ID from localStorage
    const sessionId = localStorage.getItem("guest_session_id");
    if (sessionId) {
      setGuestSessionId(sessionId);
    } else {
      console.error("No guest session ID found");
    }
  }, []);

  useEffect(() => {
    if (guestSessionId) {
      const fetchData = async () => {
        try {
          const movieData = await fetchRatedMovies(guestSessionId);
          setRatedMovies(movieData);
        } catch (error) {
          console.error("Error fetching rated movies:", error);
        }

        try {
          const tvShowData = await fetchRatedTvShows(guestSessionId);
          setRatedTvShows(tvShowData);
        } catch (error) {
          console.error("Error fetching rated TV shows:", error);
        }

        setLoading(false);
      };

      fetchData();
    }
  }, [guestSessionId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!ratedMovies || !ratedTvShows) {
    return notFound();
  }

  return (
    <Container
      sx={{
        mt: 6,
        height: "100vh", // Make the container fill the full height of the page
        display: "flex",
        flexDirection: "column", // Make it a flex container
        justifyContent: "flex-start", // Align content to the top
      }}
    >
      <Paper sx={{ p: 3, mt: 2 }}>
        <div>
          <Typography variant="h4" gutterBottom>
            Rated Movies
          </Typography>
          <ColumnDisplay
            data={ratedMovies.results}
            displayType={DisplayType.Movies}
            isRated
          />
        </div>
        <div>
          <Typography variant="h4" gutterBottom>
            Rated TV Shows
          </Typography>
          <ColumnDisplay
            data={ratedTvShows.results}
            displayType={DisplayType.TvShows}
            isRated
          />
        </div>
      </Paper>
    </Container>
  );
}
