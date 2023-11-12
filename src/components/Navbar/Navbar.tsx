import React from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

export const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }} width="100%">
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between", minHeight: 40 }}>
          <Typography variant="h6" fontSize="small">
            HeroHoard
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
