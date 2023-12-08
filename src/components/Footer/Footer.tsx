import { AppBar, Toolbar, useMediaQuery, useTheme, Box } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import React from "react";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { useParams } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import InventoryIcon from "@mui/icons-material/Inventory";
import { NavIconLink } from "../Buttons/NavIconLink";

export const Footer = () => {
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down("sm"));
  const { id } = useParams();

  if (!isMobile || id === undefined) return null;

  return (
    <Box sx={{ flexGrow: 1 }} width="100%" mb={6}>
      <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar sx={{ justifyContent: "space-around", minHeight: 40 }}>
          <NavIconLink
            to="details"
            size="small"
            icon={<PersonIcon fontSize="small" />}
          />
          <NavIconLink
            to="skills"
            size="small"
            icon={<ListAltIcon fontSize="small" />}
          />
          <NavIconLink
            to="inventory"
            size="small"
            icon={<InventoryIcon fontSize="small" />}
          />
          <NavIconLink
            to="feats"
            size="small"
            icon={<AutoAwesomeIcon fontSize="small" />}
          />
          <NavIconLink
            to="spells"
            size="small"
            icon={<AutoFixHighIcon fontSize="small" />}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
};
