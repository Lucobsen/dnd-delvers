import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  styled,
  Typography,
  Stack,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import React from "react";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { NavLink, useParams } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import InventoryIcon from "@mui/icons-material/Inventory";

const StyledNavLink = styled(NavLink)`
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

export const Sidebar = () => {
  const { id } = useParams();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        color="primary"
        sx={{ left: 0, height: "100%", width: 100 }}
      >
        <Toolbar
          sx={{
            my: 4,
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Stack spacing={8}>
            <StyledNavLink to="/">
              <Typography variant="h6" sx={{ fontSize: 25 }}>
                HH
              </Typography>
            </StyledNavLink>

            {id !== undefined && (
              <>
                <NavLink to="details">
                  <IconButton
                    color="inherit"
                    aria-label="details"
                    title="details"
                  >
                    <PersonIcon sx={{ color: "white" }} />
                  </IconButton>
                </NavLink>

                <NavLink to="skills">
                  <IconButton
                    color="inherit"
                    aria-label="skills"
                    title="skills"
                  >
                    <ListAltIcon sx={{ color: "white" }} />
                  </IconButton>
                </NavLink>

                <NavLink to="inventory">
                  <IconButton
                    color="inherit"
                    aria-label="inventory"
                    title="inventory"
                  >
                    <InventoryIcon sx={{ color: "white" }} />
                  </IconButton>
                </NavLink>

                <NavLink to="feats">
                  <IconButton
                    color="inherit"
                    aria-label="features and traits"
                    title="features and traits"
                  >
                    <AutoAwesomeIcon sx={{ color: "white" }} />
                  </IconButton>
                </NavLink>

                <NavLink to="spells">
                  <IconButton
                    color="inherit"
                    aria-label="spells"
                    title="spells"
                  >
                    <AutoFixHighIcon sx={{ color: "white" }} />
                  </IconButton>
                </NavLink>
              </>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
