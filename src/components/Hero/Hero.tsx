import { Container } from "@mui/material";
import React from "react";
import { CharacterDetails } from "../CharacterDetails/CharacterDetails";
import { Skills } from "../Skills/Skills";
import { HeroStats } from "../HeroStats/HeroStats";

export const Hero = () => {
  return (
    <Container sx={{ height: "95vh" }}>
      <CharacterDetails />
      <HeroStats />
      <Skills />
    </Container>
  );
};
