import { AppBar, Toolbar, Box, styled, Typography, Stack } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import React from "react";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { NavLink, useParams } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import InventoryIcon from "@mui/icons-material/Inventory";
import { NavIconLink } from "../Buttons/NavIconLink";

const StyledNavLink = styled(NavLink)`
  color: white;
  text-decoration: none;
`;

export const Sidebar = () => {
  const { id } = useParams();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        color="primary"
        sx={{ left: 0, height: "100%", width: 60 }}
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
                <NavIconLink to="details" icon={<PersonIcon />} />
                <NavIconLink to="skills" icon={<ListAltIcon />} />
                <NavIconLink to="inventory" icon={<InventoryIcon />} />
                <NavIconLink to="feats" icon={<AutoAwesomeIcon />} />
                <NavIconLink to="spells" icon={<AutoFixHighIcon />} />
              </>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
