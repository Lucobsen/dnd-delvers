import { Grid, Stack } from "@mui/material";
import React, { useState } from "react";
import { useRaces } from "../../services/races/races.services";
import { useClasses } from "../../services/classes/classes.service";
import { levels } from "../../models/levels.models";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  updateArmourClass,
  updateClass,
  updateLevel,
  updateName,
  updateRace,
} from "../../store/slices/HeroSlice";
import { SelectComponent } from "../shared/SelectComponent";
import { TextBox } from "../shared/TextBox";
import { DeathSaveModal } from "../modals/DeathSaves.modal";
import { HpLogic } from "./HpLogic";

export const Details = () => {
  const { level, ac, proficiencyBonus, classId, race, name } = useAppSelector(
    (state) => state.hero
  );
  const dispatch = useAppDispatch();

  const { races, isLoading: isLoadingRaces } = useRaces();
  const { classes, isLoading: isLoadingClasses } = useClasses();

  const [deathSaves, setDeathSaves] = useState(false);

  return (
    <>
      <Grid container spacing={1} pb={1.5}>
        <Grid item xs={9} pb={0.5}>
          <TextBox
            value={name}
            label="Name"
            placeholder="Enter Name"
            onChange={(value) => dispatch(updateName(value))}
          />
        </Grid>

        <Grid item xs={3} pb={0.5}>
          <TextBox
            value={ac}
            label="AC"
            isNumber
            onChange={(value) => dispatch(updateArmourClass(value))}
          />
        </Grid>

        <Grid item xs={3.5}>
          <SelectComponent
            onValueChange={(value) => dispatch(updateLevel(value))}
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
          onValueChange={(value) => dispatch(updateRace(value))}
          value={race}
        />

        <SelectComponent
          isLoading={isLoadingClasses}
          label="Class"
          options={classes.map((classy) => classy.name)}
          onValueChange={(value) => dispatch(updateClass(value))}
          value={classId}
        />
      </Stack>

      <DeathSaveModal open={deathSaves} onClose={() => setDeathSaves(false)} />
    </>
  );
};
