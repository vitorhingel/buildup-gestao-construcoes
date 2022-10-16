import { Box, Typography } from "@mui/material";

import React from "react";

import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <Box display="flex" height="100vh" width="100vw" alignItems="center" flexDirection={"column"} sx={{ pb: 10 }} justifyContent="center">
      <Typography variant="h3">This page was not found.</Typography>
      <Typography variant="body1">
        <Link to="/">Click here to go to home</Link>{" "}
      </Typography>
    </Box>
  );
};
