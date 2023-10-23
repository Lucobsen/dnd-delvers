import { Container } from "@mui/material";
import React, { useState } from "react";
import { CharacterDetails } from "../CharacterDetails/CharacterDetails";
import { CharacterStats } from "../CharacterStats/CharacterStats";
import { Skills } from "../Skills/Skills";

export const Hero = () => {
  return (
    <Container sx={{ height: "90vh" }}>
      <CharacterDetails />
      <CharacterStats />
      <Skills />
    </Container>
  );
};
