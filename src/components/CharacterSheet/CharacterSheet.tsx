import { Container } from "@mui/material";
import React from "react";
import { CharacterDetails } from "../CharacterDetails/CharacterDetails";
import { CharacterStats } from "../CharacterStats/CharacterStats";

export const CharacterSheet = () => {
  return (
    <Container sx={{ height: "90vh" }}>
      <CharacterDetails />
      <CharacterStats />
    </Container>
  );
};
