// Import necessary components and functions
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { fetchMovieDetails } from "../../../utils/query";

// Define props interface for the MoviePage component
interface MoviePageProps {
  params: { id: string };
}

// MoviePage component to display details of a specific movie
export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;

  // If no ID is provided, return a 404 page
  if (!id) {
    return notFound();
  }

  let data;
  try {
    // Fetch movie details
    data = await fetchMovieDetails(id);
  } catch (error) {
    console.error("Error fetching movie:", error);
    return notFound();
  }

  return (
    <div style={{ marginTop: 50 }}>
      {/* Movie Card Container */}
      <Card sx={{ p: 2 }}>
        <CardContent>
          {/* Movie Title */}
          <Typography variant="h5" gutterBottom>
            {data.title}
          </Typography>
          <Grid container spacing={3} alignItems="center">
            {/* Poster Section */}
            <Grid
              size={{ xs: 12, sm: 5 }}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <CardMedia
                component="img"
                image={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
                alt={data.title}
                sx={{ maxWidth: "100%", height: "auto", borderRadius: 2 }}
              />
            </Grid>

            {/* Movie Details Section */}
            <Grid size={{ xs: 12, sm: 7 }}>
              <List>
                {/* Movie details list */}
                <ListItem>
                  <ListItemText
                    primary="Is The Movie For Adults:"
                    secondary={data.adult ? "Yes" : "No"}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Budget:"
                    secondary={`$${data.budget.toLocaleString()}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Genres:"
                    secondary={data.genres
                      .map((genre: any) => genre.name)
                      .join(", ")}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="IMDB ID:" secondary={data.imdb_id} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Popularity:"
                    secondary={data.popularity}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Production Companies:"
                    secondary={data.production_companies
                      .map((c: any) => c.name)
                      .join(", ")}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Release Date:"
                    secondary={data.release_date}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Revenue:"
                    secondary={`$${data.revenue.toLocaleString()}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Runtime:"
                    secondary={`${data.runtime} minutes`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Vote Average:"
                    secondary={data.vote_average}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Language:"
                    secondary={data.original_language.toUpperCase()}
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
