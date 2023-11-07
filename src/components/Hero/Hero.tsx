import { Button, Container } from "@mui/material";
import React, { useState } from "react";
import { Details } from "../Details/Details";
import { HeroStats } from "../Stats/Stats";
import { Skills } from "../Skills/Skills";
import { Feats } from "../Feats/Feats";

export const Hero = () => {
  const [openSkills, setOpenSkills] = useState(false);
  const [openFeats, setOpenFeats] = useState(false);

  return (
    <Container sx={{ height: "95vh" }}>
      <Details />

      <HeroStats />

      <Button
        fullWidth
        variant="outlined"
        onClick={() => setOpenSkills(true)}
        sx={{ mt: 2 }}
      >
        Skills
      </Button>

      <Button
        fullWidth
        variant="outlined"
        onClick={() => setOpenFeats(true)}
        sx={{ mt: 1 }}
      >
        Features & Traits
      </Button>

      <Skills open={openSkills} onClose={() => setOpenSkills(false)} />
      <Feats open={openFeats} onClose={() => setOpenFeats(false)} />
    </Container>
  );
};
