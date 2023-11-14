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
import { updateSpells } from "../../store/slices/HeroSlice";

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
  const { spells } = useAppSelector((state) => state.hero.spells);
  const dispatch = useAppDispatch();
  const [newCantrip, setNewCantrip] = useState("");

  if (selectedSpellLevel === null) return null;

  const spellList =
    spells.find(({ id }) => id === selectedSpellLevel)?.spells ?? [];

  const handleDeleteCantrip = (index: number) => {
    const tempSpells = [...spellList];
    tempSpells.splice(index, 1);

    dispatch(updateSpells({ id: selectedSpellLevel, spells: [...tempSpells] }));
  };

  const handleUpdateCantrip = (
    { target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const tempSpells = [...spellList];
    tempSpells[index] = target.value;

    dispatch(updateSpells({ id: selectedSpellLevel, spells: [...tempSpells] }));
  };

  const handleAddCantrip = () => {
    const updatedCantrips = [...spellList, newCantrip];
    dispatch(updateSpells({ id: selectedSpellLevel, spells: updatedCantrips }));
    setNewCantrip("");
  };

  return (
    <Dialog onClose={onClose} open={open} fullWidth>
      <Box minHeight={300} px={1} textAlign="center">
        <List dense disablePadding>
          <ListSubheader
            sx={{ height: 30, color: "rgb(25, 118, 210)" }}
            disableGutters
          >
            {`${selectedSpellLevel} Level Spells`}
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
                  onClick={() => handleDeleteCantrip(index)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <TextField
                fullWidth
                variant="standard"
                value={spell}
                placeholder="Add cantrip"
                onBlur={(event) => {
                  if (event.target.value === "") handleDeleteCantrip(index);
                }}
                onChange={(event) => handleUpdateCantrip(event, index)}
              />
            </ListItem>
          ))}
          <ListItem
            dense
            disableGutters
            secondaryAction={
              <IconButton
                disabled={newCantrip === ""}
                edge="end"
                aria-label="add"
                onClick={handleAddCantrip}
              >
                <AddIcon />
              </IconButton>
            }
          >
            <TextField
              fullWidth
              variant="standard"
              placeholder={`Add spell`}
              value={newCantrip}
              onChange={(event) => setNewCantrip(event.target.value)}
            />
          </ListItem>
        </List>
      </Box>
    </Dialog>
  );
};
