import { Button } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import { Hero } from "../../models/hero.models";

interface HeroButtonProps {
  hero: Hero;
}

export const HeroButton = ({ hero }: HeroButtonProps) => {
  const { id, name } = hero;

  return (
    <NavLink to={`../${id}/details`}>
      <Button fullWidth variant="outlined">
        {name === "" ? "Untitled Hero" : name}
      </Button>
    </NavLink>
  );
};
