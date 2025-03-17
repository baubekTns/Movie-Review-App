"use client";
import { Typography, Button, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createGuestSession } from "../../utils/query";

export default function Auth() {
  const router = useRouter();

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ["createGuestSession"],
    mutationFn: createGuestSession,
    onSuccess: (data) => {
      if (data?.guest_session_id) {
        localStorage.setItem("guest_session_id", data.guest_session_id);
        router.push("/"); // Redirect to homepage
      } else {
        console.error("guest_session_id not found in response:", data);
      }
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      style={{ height: "100vh" }}
    >
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Paper elevation={3} style={{ padding: "2rem" }}>
          <Typography
            variant="h5"
            align="center"
            color="primary"
            style={{ marginBottom: "1.5rem" }}
          >
            Welcome! Login by registering as a Guest below.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            onClick={() => mutate()}
            disabled={isPending}
          >
            {isPending ? "Logging in..." : "Login"}
          </Button>
          {isError && (
            <Typography
              color="error"
              align="center"
              style={{ marginTop: "1rem" }}
            >
              {error.message}
            </Typography>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}
