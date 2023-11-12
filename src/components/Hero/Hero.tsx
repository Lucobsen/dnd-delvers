import { Container } from "@mui/material";
import React from "react";
import { Details } from "../Details/Details";
import { HeroStats } from "../Stats/Stats";
import { SpellStats } from "../Spells/SpellStats";

export const Hero = () => (
  <Container sx={{ mt: 7 }}>
    <Details />

    <HeroStats />

    <SpellStats />
  </Container>
);
