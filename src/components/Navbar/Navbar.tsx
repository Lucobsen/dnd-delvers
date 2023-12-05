import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export const NavBar = () => {
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down("sm"));

  return (
    <Box sx={{ flexGrow: 1 }} width="100%" mb={isMobile ? 6 : 9}>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between", minHeight: 40 }}>
          <StyledLink to="/">
            <Typography variant="h6">HeroHoard</Typography>
          </StyledLink>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
