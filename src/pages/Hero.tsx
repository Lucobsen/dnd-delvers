import { Container } from "@mui/material";
import React from "react";
import { Details } from "../components/Details/Details";
import { HeroStats } from "../components/Stats/Stats";

const Hero = () => (
  <Container sx={{ mt: 7 }}>
    <Details />
    <HeroStats />
  </Container>
);

export default Hero;
