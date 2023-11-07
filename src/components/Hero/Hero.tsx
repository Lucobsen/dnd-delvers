import { Button, Container } from "@mui/material";
import React, { useState } from "react";
import { Details } from "../Details/Details";
import { HeroStats } from "../Stats/Stats";
import { Skills } from "../Skills/Skills";

export const Hero = () => {
  const [openSkills, setOpenSkills] = useState(false);

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

      <Skills open={openSkills} onClose={() => setOpenSkills(false)} />
    </Container>
  );
};
