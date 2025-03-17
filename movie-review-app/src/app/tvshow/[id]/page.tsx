import { notFound } from "next/navigation"; // Handles 404 redirects
import { JSX } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; // Icon for accordion expansion
import { fetchTvShowDetails } from "../../../utils/query";

// Type definition for component props
interface TvShowPageProps {
  params: { id: string };
}

// Type definition for season panels displayed in the UI
interface SeasonPanel {
  key: number;
  title: string;
  content: {
    content: JSX.Element;
    // numberOfEpisodes: number;
  };
}

// Main component for displaying TV show details
export default async function TvShowPage({ params }: TvShowPageProps) {
  const { id } = await params; // Extracts TV show ID from URL params

  if (!id) {
    return notFound(); // Redirects to 404 page if no ID is provided
  }

  let data;
  try {
    data = await fetchTvShowDetails(id); // Fetch TV show details from TMDB
  } catch (error) {
    console.error("Error fetching movie:", error);
    return notFound(); // Handles fetch errors by redirecting to 404 page
  }

  // Maps seasons to accordion panels for UI display
  const seasonPanels = data.seasons.map((season: any) => ({
    key: season.id,
    title: `Season ${season.season_number}`,
    content: {
      content: (
        <Card
          sx={{ height: 70, display: "flex", alignItems: "center", padding: 2 }}
        >
          <CardContent sx={{ flex: 1 }}>
            <Typography variant="body2" color="textSecondary" component="span">
              {season.air_date}
            </Typography>
            <Typography variant="body2" component="span">
              {`${season.episode_count} episodes`}
            </Typography>
          </CardContent>
        </Card>
      ),
    },
  }));

  return (
    <div style={{ marginTop: 50 }}>
      <Card sx={{ p: 2 }}>
        <CardContent>
          {/* TV Show Title */}
          <Typography variant="h5" gutterBottom>
            {data.name}
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

            {/* Details Section */}
            <Grid size={{ xs: 12, sm: 7 }}>
              <List>
                {/* Show Creators */}
                <ListItem>
                  <ListItemText
                    primary="Created by:"
                    secondary={
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="span"
                      >
                        {data.created_by
                          .map((creator: any) => creator.name)
                          .join(", ")}
                      </Typography>
                    }
                  />
                </ListItem>

                {/* Episode Run Time */}
                <ListItem>
                  <ListItemText
                    primary="Episodes Run Time:"
                    secondary={data.episode_run_time.join(", ")}
                  />
                </ListItem>

                {/* Genres */}
                <ListItem>
                  <ListItemText
                    primary="Genres:"
                    secondary={data.genres
                      .map((genre: any) => genre.name)
                      .join(", ")}
                  />
                </ListItem>

                {/* First Air Date */}
                <ListItem>
                  <ListItemText
                    primary="First Air Date:"
                    secondary={data.first_air_date}
                  />
                </ListItem>

                {/* Networks */}
                <ListItem>
                  <ListItemText
                    primary="Networks:"
                    secondary={data.networks.map((network: any) => (
                      <CardMedia
                        key={network.id}
                        component="img"
                        image={`https://image.tmdb.org/t/p/original/${network.logo_path}`}
                        alt={network.name}
                        sx={{
                          marginRight: 2,
                          maxWidth: "100%",
                          width: 120,
                          height: "auto",
                          objectFit: "contain",
                          borderRadius: 2,
                        }}
                      />
                    ))}
                  />
                </ListItem>

                {/* Production Companies */}
                <ListItem>
                  <ListItemText
                    primary="Production Companies:"
                    secondary={data.production_companies
                      .map((c: any) => c.name)
                      .join(", ")}
                  />
                </ListItem>

                {/* Number of Episodes & Seasons */}
                <ListItem>
                  <ListItemText
                    primary="Number of Episodes:"
                    secondary={data.number_of_episodes}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Number of Seasons:"
                    secondary={data.number_of_seasons}
                  />
                </ListItem>

                {/* Seasons Accordion */}
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary="Seasons:"
                    secondary={
                      <Typography component="span">
                        <Box sx={{ height: 200, overflowY: "scroll" }}>
                          {seasonPanels.map((panel: SeasonPanel) => (
                            <Accordion key={panel.key}>
                              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="subtitle1">
                                  {panel.title}
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                {panel.content.content}
                                {/* {panel.content.content} */}
                              </AccordionDetails>
                            </Accordion>
                          ))}
                        </Box>
                      </Typography>
                    }
                  />
                </ListItem>

                {/* Vote Average & Language */}
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
