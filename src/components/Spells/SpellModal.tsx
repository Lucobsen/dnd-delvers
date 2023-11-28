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

  const { spellList } = hero.spells;

  const selectedSpells =
    spellList.find(({ id }) => id === selectedSpellLevel)?.spells ?? [];

  const handleDeleteSpell = (index: number) => {
    const tempSpells = [...selectedSpells];
    tempSpells.splice(index, 1);

    const tempSpellList = [...spellList];
    tempSpellList[index].spells = [...tempSpells];

    const updatedHero: Hero = {
      ...hero,
      spells: {
        ...hero.spells,
        spellList: [...tempSpellList],
      },
    };
    dispatch(updateHero(updatedHero));
  };

  const handleUpdateSpell = (
    { target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const tempSpells = [...selectedSpells];
    tempSpells[index] = target.value;

    const tempSpellList = [...spellList];
    tempSpellList[index].spells = [...tempSpells];

    const updatedHero: Hero = {
      ...hero,
      spells: {
        ...hero.spells,
        spellList: [...tempSpellList],
      },
    };
    dispatch(updateHero(updatedHero));
  };

  const handleAddSpell = () => {
    const tempSpellList = [...spellList];
    const tempSpells = [...selectedSpells];
    tempSpells.push(newSpell);

    const index = tempSpellList.findIndex(
      (info) => info.id === selectedSpellLevel
    );

    if (index >= 0) {
      tempSpellList[index].spells = [...tempSpells];

      const updatedHero: Hero = {
        ...hero,
        spells: {
          ...hero.spells,
          spellList: [...tempSpellList],
        },
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
          {spellList.map((spell, index) => (
            <ListItem
              key={`${spell}-${index}`}
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
                onChange={(event) => handleUpdateSpell(event, index)}
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
