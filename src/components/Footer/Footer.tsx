import { AppBar, Toolbar, IconButton } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import React, { useState } from "react";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { Skills } from "../Skills/Skills";
import { Feats } from "../Feats/Feats";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { SpellList } from "../Spells/SpellList";

export const Footer = () => {
  const [openSpells, setOpenSpells] = useState(false);
  const [openSkills, setOpenSkills] = useState(false);
  const [openFeats, setOpenFeats] = useState(false);

  return (
    <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
      <Toolbar sx={{ justifyContent: "space-around", minHeight: 40 }}>
        <IconButton
          onClick={() => setOpenSkills(true)}
          color="inherit"
          aria-label="skills"
          title="skills"
          size="small"
        >
          <ListAltIcon fontSize="small" />
        </IconButton>
        <IconButton
          onClick={() => setOpenFeats(true)}
          size="small"
          color="inherit"
          aria-label="features and traits"
          title="features and traits"
        >
          <AutoAwesomeIcon fontSize="small" />
        </IconButton>
        <IconButton
          onClick={() => setOpenSpells(true)}
          size="small"
          color="inherit"
          aria-label="spells"
          title="spells"
        >
          <AutoFixHighIcon fontSize="small" />
        </IconButton>
      </Toolbar>

      <Skills open={openSkills} onClose={() => setOpenSkills(false)} />
      <Feats open={openFeats} onClose={() => setOpenFeats(false)} />
      <SpellList open={openSpells} onClose={() => setOpenSpells(false)} />
    </AppBar>
  );
};
