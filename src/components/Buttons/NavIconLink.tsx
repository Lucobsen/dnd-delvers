import { IconButton } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

interface NavIconLinkProps {
  to: string;
  icon: JSX.Element;
  size?: "small" | "medium";
}

export const NavIconLink = ({
  to,
  icon,
  size = "medium",
}: NavIconLinkProps) => (
  <NavLink
    to={to}
    style={({ isActive }) => {
      return {
        borderRadius: 50,
        color: isActive ? "rgb(25, 118, 210)" : "white",
        backgroundColor: isActive ? "white" : "transparent",
      };
    }}
  >
    <IconButton
      color="inherit"
      aria-label={to}
      title={to}
      sx={{ p: size === "small" ? "4px" : "8px" }}
    >
      {icon}
    </IconButton>
  </NavLink>
);
