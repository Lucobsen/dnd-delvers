import { Container } from "@mui/material";
import React from "react";
import { Details } from "../components/Details/Details";
import { HeroStats } from "../components/Stats/Stats";
import { SpellStats } from "../components/Spells/SpellStats";

export const Hero = () => (
  <Container sx={{ mt: 7 }}>
    <Details />

    <HeroStats />

    <SpellStats />
  </Container>
);
