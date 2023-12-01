import { Dialog } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Hero } from "../../models/hero.models";
import { useParams } from "react-router-dom";
import { updateHero } from "../../store/slices/HeroHoardSlice";
import { TextList } from "../shared/TextList";

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

  const handleUpdateSpell = (value: string, index: number) => {
    const tempSpells = [...selectedSpells];
    tempSpells[index] = value;

    handleUpdateSpells(tempSpells);
  };

  const handleAddSpell = (newSpell: string) => {
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
    }
  };

  return (
    <Dialog
      onClose={onClose}
      open={open}
      fullWidth
      sx={{ textAlign: "center" }}
    >
      <TextList
        disableGutters={false}
        onDelete={handleDeleteSpell}
        onUpdate={handleUpdateSpell}
        onAdd={handleAddSpell}
        title={`Level ${selectedSpellLevel} Spells`}
        items={selectedSpells}
        placeholder="Add spell"
      />
    </Dialog>
  );
};
