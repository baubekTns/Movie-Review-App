"use client";
import { DisplayType as DisplayTypeEnum } from "../app/page";
import Grid from "@mui/material/Grid2";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Link,
  Box,
  TextField,
  Button,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { rateMovie, rateTvShow } from "../utils/query";

// Define the interface for the data passed to the component
interface DisplayData {
  id: number;
  overview: string;
  poster_path: string;
  title?: string;
  name?: string;
  vote_average: number;
  release_date: string;
  rating?: number;
}

// Define the props for the component, including the data, display type, and optional rating status
interface Props {
  data: DisplayData[];
  displayType: DisplayTypeEnum;
  isRated?: boolean;
}

// Main component for displaying a list of movies or TV shows
export default function ColumnDisplay(props: Props) {
  if (!props.data || props.data.length === 0) {
    return <div>No data available.</div>; // Handle empty state
  }

  const { data, displayType, isRated } = props;

  // Handler for submitting the rating form
  const handleSubmit =
    (data: DisplayData) => (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const rating = Number(formData.get("rating")) || 10; // Default to 10 if no rating provided
      rate({ id: data.id, rating });
    };

  const onSuccess = () => {
    toast.success("Rating submitted successfully.");
  };

  const onError = (error: Error) => {
    toast.error(`Failed to submit rating: ${error.message}`);
  };

  // Define mutations for movie and TV show ratings
  const { mutate: rateMovieMutation } = useMutation({
    mutationKey: ["rateMovie"],
    mutationFn: ({ id, rating }: { id: number; rating: number }) =>
      rateMovie(id, rating),
    onSuccess,
    onError,
  });

  const { mutate: rateTvShowMutation } = useMutation({
    mutationKey: ["rateTvShow"],
    mutationFn: ({ id, rating }: { id: number; rating: number }) =>
      rateTvShow(id, rating),
    onSuccess,
    onError,
  });

  const rate =
    displayType === DisplayTypeEnum.Movies
      ? rateMovieMutation
      : rateTvShowMutation;

  return (
    <Grid container spacing={3} justifyContent="center">
      {/* Map through the display data and create a card for each item */}
      {data.map((displayData: DisplayData) => (
        <Grid
          size={{ xs: 12, sm: 6, md: 4 }}
          key={displayData.id}
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Link to the detailed page for the movie or TV show */}
          <Link
            href={`/${
              displayType === DisplayTypeEnum.Movies ? "movie" : "tvshow"
            }/${displayData.id}`}
            sx={{ textDecoration: "none" }}
          >
            <Card
              sx={{
                width: 345,
                height: "auto",
                display: "flex",
                flexDirection: "column",
                boxSizing: "border-box",
              }}
            >
              {/* Display the poster image */}
              <CardMedia
                component="img"
                height="300"
                image={`https://image.tmdb.org/t/p/original/${displayData.poster_path}`}
                alt={displayData.title || displayData.name}
                sx={{
                  objectFit: "cover",
                  flexShrink: 0,
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                {/* Title of the movie or TV show */}
                <Typography
                  variant="h6"
                  align="center"
                  sx={{ marginBottom: 1 }}
                >
                  {displayType === DisplayTypeEnum.Movies
                    ? displayData.title
                    : displayData.name}
                </Typography>
                {/* Release date and average rating */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                  sx={{ marginBottom: 1 }}
                >
                  Release Date: {displayData.release_date} | Rating:{" "}
                  {displayData.vote_average}
                </Typography>
                {/* Overview with truncation if too long */}
                <Typography variant="body2" sx={{ marginBottom: 2 }}>
                  {displayData.overview.length > 200
                    ? displayData.overview.slice(0, 200) + "..."
                    : displayData.overview}
                </Typography>
              </CardContent>
            </Card>
          </Link>

          {/* Display user's rating if it's already rated */}
          {isRated && (
            <Typography variant="body2" sx={{ mt: 2 }}>
              Your Rating: {displayData.rating}
            </Typography>
          )}

          {/* Form for submitting a rating */}
          <Box
            component="form"
            sx={{
              marginTop: 2,
              display: "flex",
              gap: 1,
              flexDirection: "column",
              alignItems: "center",
            }}
            onSubmit={handleSubmit(displayData)}
          >
            <TextField
              type="number"
              name="rating"
              defaultValue={10}
              variant="outlined"
              size="small"
              sx={{ width: "120px" }}
              slotProps={{ htmlInput: { min: 0, max: 10 } }} // Restrict rating between 0 and 10
            />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              startIcon={<StarIcon />}
            >
              Rate
            </Button>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
