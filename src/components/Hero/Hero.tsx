import { Button, Container, Grid } from "@mui/material";
import React, { useState } from "react";
import { Details } from "../Details/Details";
import { HeroStats } from "../Stats/Stats";
import { Skills } from "../Skills/Skills";
import { Feats } from "../Feats/Feats";
import { SpellStats } from "../Spells/SpellStats";

export const Hero = () => {
  const [openSkills, setOpenSkills] = useState(false);
  const [openFeats, setOpenFeats] = useState(false);

  return (
    <Container sx={{ height: "95vh" }}>
      <Details />

      <HeroStats />

      <SpellStats />

      <Grid container mt={1} spacing={1}>
        <Grid item xs={4}>
          <Button
            sx={{ padding: "5px 10px" }}
            fullWidth
            variant="outlined"
            onClick={() => setOpenSkills(true)}
          >
            Skills
          </Button>
        </Grid>

        <Grid item xs={8}>
          <Button
            sx={{ padding: "5px 10px" }}
            fullWidth
            variant="outlined"
            onClick={() => setOpenFeats(true)}
          >
            Features & Traits
          </Button>
        </Grid>
      </Grid>

      <Skills open={openSkills} onClose={() => setOpenSkills(false)} />
      <Feats open={openFeats} onClose={() => setOpenFeats(false)} />
    </Container>
  );
};
