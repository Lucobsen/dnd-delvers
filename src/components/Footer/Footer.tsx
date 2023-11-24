import { AppBar, Toolbar, IconButton } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import React from "react";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { NavLink } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import InventoryIcon from "@mui/icons-material/Inventory";
import { useAppSelector } from "../../hooks/hooks";

export const Footer = () => {
  const { id } = useAppSelector((state) => state.hero);

  return (
    <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
      <Toolbar sx={{ justifyContent: "space-around", minHeight: 40 }}>
        <NavLink to={`${id}/details`}>
          <IconButton
            color="inherit"
            aria-label="details"
            title="details"
            size="small"
          >
            <PersonIcon fontSize="small" sx={{ color: "white" }} />
          </IconButton>
        </NavLink>

        <NavLink to={`${id}/skills`}>
          <IconButton
            color="inherit"
            aria-label="skills"
            title="skills"
            size="small"
          >
            <ListAltIcon fontSize="small" sx={{ color: "white" }} />
          </IconButton>
        </NavLink>

        <NavLink to={`${id}/inventory`}>
          <IconButton
            color="inherit"
            aria-label="inventory"
            title="inventory"
            size="small"
          >
            <InventoryIcon fontSize="small" sx={{ color: "white" }} />
          </IconButton>
        </NavLink>

        <NavLink to={`${id}/feats`}>
          <IconButton
            size="small"
            color="inherit"
            aria-label="features and traits"
            title="features and traits"
          >
            <AutoAwesomeIcon fontSize="small" sx={{ color: "white" }} />
          </IconButton>
        </NavLink>

        <NavLink to={`${id}/spells`}>
          <IconButton
            size="small"
            color="inherit"
            aria-label="spells"
            title="spells"
          >
            <AutoFixHighIcon fontSize="small" sx={{ color: "white" }} />
          </IconButton>
        </NavLink>
      </Toolbar>
    </AppBar>
  );
};
