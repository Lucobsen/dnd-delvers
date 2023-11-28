import { Grid, Stack } from "@mui/material";
import React, { useState } from "react";
import { useRaces } from "../../services/races/races.services";
import { useClasses } from "../../services/classes/classes.service";
import { getProficiencyBonus, levels } from "../../models/levels.models";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { SelectComponent } from "../shared/SelectComponent";
import { TextBox } from "../shared/TextBox";
import { DeathSaveModal } from "../modals/DeathSaves.modal";
import { HpLogic } from "./HpLogic";
import { useParams } from "react-router-dom";
import { updateHero } from "../../store/slices/HeroHoardSlice";
import { Hero } from "../../models/hero.models";

export const Details = () => {
  const { id } = useParams();
  const hero = useAppSelector((state) =>
    state.heroHoard.find(({ id: heroId }) => heroId === id)
  );
  const dispatch = useAppDispatch();

  const { races, isLoading: isLoadingRaces } = useRaces();
  const { classes, isLoading: isLoadingClasses } = useClasses();

  const [deathSaves, setDeathSaves] = useState(false);

  if (!hero) return null;

  const { level, ac, proficiencyBonus, classId, race, name } = hero;

  const handleUpdateName = (newName: string) => {
    const updatedHero: Hero = { ...hero, name: newName };
    dispatch(updateHero(updatedHero));
  };

  const handleUpdateArmourClass = (newAc: string) => {
    const updatedHero: Hero = { ...hero, ac: newAc };
    dispatch(updateHero(updatedHero));
  };

  const handleUpdateClass = (newClassId: string) => {
    const updatedHero: Hero = { ...hero, classId: newClassId };
    dispatch(updateHero(updatedHero));
  };

  const handleUpdateLevel = (newLevel: string) => {
    const updatedHero: Hero = {
      ...hero,
      level: newLevel,
      proficiencyBonus: getProficiencyBonus(newLevel),
    };
    dispatch(updateHero(updatedHero));
  };

  const handleUpdateRace = (newRace: string) => {
    const updatedHero: Hero = { ...hero, race: newRace };
    dispatch(updateHero(updatedHero));
  };

  return (
    <>
      <Grid container spacing={1} pb={1.5}>
        <Grid item xs={9} pb={0.5}>
          <TextBox
            value={name}
            label="Name"
            placeholder="Enter Name"
            onChange={(value) => handleUpdateName(value)}
          />
        </Grid>

        <Grid item xs={3} pb={0.5}>
          <TextBox
            value={ac}
            label="AC"
            isNumber
            onChange={(value) => handleUpdateArmourClass(value)}
          />
        </Grid>

        <Grid item xs={3.5}>
          <SelectComponent
            onValueChange={(value) => handleUpdateLevel(value)}
            options={levels}
            label="Level"
            value={level}
          />
        </Grid>

        <Grid item xs={2.5}>
          <TextBox value={proficiencyBonus} label="Prof." readOnly />
        </Grid>

        <Grid item xs={6}>
          <HpLogic onDeathSaveChange={setDeathSaves} />
        </Grid>
      </Grid>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-evenly"
        spacing={1}
      >
        <SelectComponent
          isLoading={isLoadingRaces}
          label="Race"
          options={races.map((race) => race.name)}
          onValueChange={(value) => handleUpdateRace(value)}
          value={race}
        />

        <SelectComponent
          isLoading={isLoadingClasses}
          label="Class"
          options={classes.map((classy) => classy.name)}
          onValueChange={(value) => handleUpdateClass(value)}
          value={classId}
        />
      </Stack>

      <DeathSaveModal open={deathSaves} onClose={() => setDeathSaves(false)} />
    </>
  );
};
