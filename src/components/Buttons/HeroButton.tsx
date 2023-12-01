import { Button } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

interface HeroButtonProps {
  id: string;
  name: string;
}

export const HeroButton = ({ id, name }: HeroButtonProps) => (
  <NavLink to={`../${id}/details`}>
    <Button fullWidth variant="outlined">
      {name === "" ? "Untitled Hero" : name}
    </Button>
  </NavLink>
);
