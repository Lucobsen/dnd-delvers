import { Container } from "@mui/material";
import React from "react";
import { Details } from "../components/Details/Details";
import { HeroStats } from "../components/Stats/Stats";
import { DeleteHeroButton } from "../components/Buttons/DeleteHero";

const Hero = () => (
  <Container sx={{ mt: 7 }}>
    <Details />
    <HeroStats />
    <DeleteHeroButton />
  </Container>
);

export default Hero;
