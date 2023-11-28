import {
  Box,
  Dialog,
  IconButton,
  List,
  ListItem,
  ListSubheader,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Hero } from "../../models/hero.models";
import { useParams } from "react-router-dom";
import { updateHero } from "../../store/slices/HeroHoardSlice";

interface SpellModalProps {
  open: boolean;
  onClose: () => void;
  selectedSpellLevel: number | null;
}

export const SpellModal = ({
  open,
  onClose,
  selectedSpellLevel,
}: SpellModalProps) => {
  const { id } = useParams();
  const hero = useAppSelector((state) =>
    state.heroHoard.find(({ id: heroId }) => heroId === id)
  );
  const dispatch = useAppDispatch();

  const [newSpell, setNewSpell] = useState("");

  if (!hero || selectedSpellLevel === null) return null;

  const { spellInfo } = hero;

  const selectedSpells =
    spellInfo.find(({ id }) => id === selectedSpellLevel)?.spells ?? [];

  const handleUpdateSpells = (newSpells: string[]) => {
    const tempSpellInfo = [...spellInfo];
    const infoIndex = tempSpellInfo.findIndex(
      (info) => info.id === selectedSpellLevel
    );

    if (infoIndex >= 0) {
      tempSpellInfo[infoIndex] = {
        ...tempSpellInfo[infoIndex],
        spells: [...newSpells],
      };

      const updatedHero: Hero = {
        ...hero,
        spellInfo: [...tempSpellInfo],
      };
      dispatch(updateHero(updatedHero));
    }
  };

  const handleDeleteSpell = (index: number) => {
    const tempSpells = [...selectedSpells];
    tempSpells.splice(index, 1);

    handleUpdateSpells(tempSpells);
  };

  const handleUpdateSpell = ({ value }: { value: string }, index: number) => {
    const tempSpells = [...selectedSpells];
    tempSpells[index] = value;

    handleUpdateSpells(tempSpells);
  };

  const handleAddSpell = () => {
    const tempSpellInfo = [...spellInfo];

    const index = tempSpellInfo.findIndex(
      (info) => info.id === selectedSpellLevel
    );

    if (index >= 0) {
      tempSpellInfo[index] = {
        ...tempSpellInfo[index],
        spells: [...selectedSpells, newSpell],
      };

      const updatedHero: Hero = {
        ...hero,
        spellInfo: [...tempSpellInfo],
      };
      dispatch(updateHero(updatedHero));

      setNewSpell("");
    }
  };

  return (
    <Dialog onClose={onClose} open={open} fullWidth>
      <Box minHeight={300} px={1} textAlign="center">
        <List dense disablePadding>
          <ListSubheader
            sx={{ height: 30, color: "rgb(25, 118, 210)" }}
            disableGutters
          >
            {`Level ${selectedSpellLevel} Spells`}
          </ListSubheader>
          {selectedSpells.map((spell, index) => (
            <ListItem
              key={index}
              dense
              disableGutters
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteSpell(index)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <TextField
                fullWidth
                variant="standard"
                value={spell}
                placeholder="Add spell"
                onBlur={(event) => {
                  if (event.target.value === "") handleDeleteSpell(index);
                }}
                onChange={({ target }) => handleUpdateSpell(target, index)}
              />
            </ListItem>
          ))}
          <ListItem
            dense
            disableGutters
            secondaryAction={
              <IconButton
                disabled={newSpell === ""}
                edge="end"
                aria-label="add"
                onClick={handleAddSpell}
              >
                <AddIcon />
              </IconButton>
            }
          >
            <TextField
              fullWidth
              variant="standard"
              placeholder={`Add spell`}
              value={newSpell}
              onChange={(event) => setNewSpell(event.target.value)}
            />
          </ListItem>
        </List>
      </Box>
    </Dialog>
  );
};
