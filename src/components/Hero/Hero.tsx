import { Container } from "@mui/material";
import React from "react";
import { Details } from "../Details/Details";
import { Skills } from "../Skills/Skills";
import { HeroStats } from "../Stats/Stats";

export const Hero = () => {
  return (
    <Container sx={{ height: "95vh" }}>
      <Details />
      <HeroStats />
      <Skills />
    </Container>
  );
};
