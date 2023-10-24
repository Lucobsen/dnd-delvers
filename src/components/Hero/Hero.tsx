import { Container } from "@mui/material";
import React from "react";
import { Details } from "../Details/Details";
import { Skills } from "../Skills/Skills";
import { Stats } from "../Stats/Stats";

export const Hero = () => {
  return (
    <Container sx={{ height: "95vh" }}>
      <Details />
      <Stats />
      <Skills />
    </Container>
  );
};
