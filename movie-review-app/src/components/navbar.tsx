"use client";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  // State to track if the user is logged in or not (null initially)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  const router = useRouter();

  // useEffect hook runs on component mount to check if the user is logged in
  useEffect(() => {
    // Ensure this code only runs in the browser environment
    if (typeof window !== "undefined") {
      setIsLoggedIn(localStorage.getItem("guest_session_id") !== null);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("guest_session_id");
    setIsLoggedIn(false); // Update the state to reflect logout
    router.push("/auth");
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#333333" }}>
      <Toolbar>
        {/* Left-aligned Home and Rated links */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {/* Home link */}
          <Link href="/" passHref>
            <Button color="inherit">Home</Button>
          </Link>
          {/* Rated link */}
          <Link href="/rated" passHref>
            <Button color="inherit">Rated</Button>
          </Link>
        </Typography>

        {/* Right-aligned Auth or Logout button based on login status */}
        <Box>
          {isLoggedIn ? (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          ) : (
            <Link href="/auth" passHref>
              <Button color="inherit">Auth</Button>
            </Link>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
