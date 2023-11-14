import { Container } from "@mui/material";
import { SpellStats } from "../components/Spells/SpellStats";
import React from "react";
import { SpellList } from "../components/Spells/SpellList";
import { Cantrips } from "../components/Spells/Cantrips";

const Spells = () => (
  <Container sx={{ mt: 6, mb: 8 }}>
    <SpellStats />
    <Cantrips />
    <SpellList />
  </Container>
);

export default Spells;
