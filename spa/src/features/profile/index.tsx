import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
export const Profile = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4">Perfil</Typography>
              <Box display="flex" alignItems="center" justifyContent="center" flexDirection={"column"} my={8}>
                <Typography variant="h4">Ainda não fui implementado</Typography>
                <Typography variant="subtitle2" gutterBottom>
                  Por favor, retorne na próxima versão :)
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};
