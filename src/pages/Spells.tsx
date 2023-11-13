import { Container } from "@mui/material";
import { SpellStats } from "../components/Spells/SpellStats";
import React from "react";
import { Cantrips } from "../components/Spells/Cantrips";

const Spells = () => (
  <Container sx={{ mt: 6 }}>
    <SpellStats />
    <Cantrips />
  </Container>
);

export default Spells;
