import { Grid, Stack } from "@mui/material";
import React, { useState } from "react";
import { useRaces } from "../../services/races/races.services";
import { useClasses } from "../../services/classes/classes.service";
import { levels } from "../../models/levels.models";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  updateClass,
  updateLevel,
  updateRace,
} from "../../store/slices/HeroSlice";
import { SelectComponent } from "../shared/SelectComponent";
import { getInitialStorageValue } from "../../utils/get-initial-storage-value";
import { TextBox } from "../shared/TextBox";

const setHpValue = (newValue: string, currentValue: string) => {
  const parsedNewValue = Number.parseInt(newValue);

  if (parsedNewValue > 999) return currentValue;

  return newValue;
};

export const Details = () => {
  const { level, proficiencyBonus, classId, race } = useAppSelector(
    (state) => state.hero
  );
  const dispatch = useAppDispatch();

  const { races, isFetching: isFetchingRaces } = useRaces();
  const { classes, isFetching: isFetchingClasses } = useClasses();

  const [characterName, setCharacterName] = useState(
    getInitialStorageValue("name")
  );
  const [ac, setAc] = useState(
    getInitialStorageValue("ac") === "" ? "10" : getInitialStorageValue("ac")
  );
  const [currentHp, setCurrentHp] = useState(
    getInitialStorageValue("currentHp")
  );
  const [maxHp, setMaxHp] = useState(getInitialStorageValue("maxHp"));

  const onNameChange = (newValue: string) => {
    localStorage.setItem("name", JSON.stringify(newValue));
    setCharacterName(newValue);
  };

  const onAcChange = (newValue: string) => {
    localStorage.setItem("ac", JSON.stringify(newValue));
    setAc(newValue);
  };

  const onLevelChange = (newValue: string) => {
    localStorage.setItem("level", JSON.stringify(newValue));
    dispatch(updateLevel(newValue));
  };

  const onHpChange = (newValue: string) => {
    const newHpValue = setHpValue(newValue, currentHp);
    localStorage.setItem("currentHp", JSON.stringify(newHpValue));
    setCurrentHp(newHpValue);
  };

  const onMaxHpChange = (newValue: string) => {
    const newHpValue = setHpValue(newValue, maxHp);
    localStorage.setItem("maxHp", JSON.stringify(newHpValue));
    setMaxHp(newHpValue);
  };

  const onRaceChange = (newValue: string) => {
    localStorage.setItem("race", JSON.stringify(newValue));
    dispatch(updateRace(newValue));
  };

  const onClassChange = (newValue: string) => {
    localStorage.setItem("class", JSON.stringify(newValue));
    dispatch(updateClass(newValue));
  };

  return (
    <>
      <Grid container spacing={1} pb={1.5}>
        <Grid item xs={9} pb={0.5}>
          <TextBox
            value={characterName}
            label="Name"
            placeholder="Enter Name"
            onChange={onNameChange}
          />
        </Grid>

        <Grid item xs={3} pb={0.5}>
          <TextBox value={ac} label="AC" isNumber onChange={onAcChange} />
        </Grid>

        <Grid item xs={3.5}>
          <SelectComponent
            onValueChange={onLevelChange}
            options={levels}
            label="Level"
            value={level}
          />
        </Grid>

        <Grid item xs={2.5}>
          <TextBox value={proficiencyBonus} label="Prof." readOnly />
        </Grid>

        <Grid item xs={3}>
          <TextBox
            value={currentHp}
            label="HP"
            isNumber
            variant="standard"
            onChange={onHpChange}
          />
        </Grid>

        <Grid item xs={3}>
          <TextBox
            value={maxHp}
            label="Max HP"
            isNumber
            variant="standard"
            onChange={onMaxHpChange}
          />
        </Grid>
      </Grid>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-evenly"
        spacing={1}
        pb={2}
      >
        <SelectComponent
          isFetching={isFetchingRaces}
          label="Race"
          options={races.map((race) => race.name)}
          onValueChange={onRaceChange}
          value={getInitialStorageValue("race") ?? race}
        />

        <SelectComponent
          isFetching={isFetchingClasses}
          label="Class"
          options={classes.map((classy) => classy.name)}
          onValueChange={onClassChange}
          value={getInitialStorageValue("class") ?? classId}
        />
      </Stack>
    </>
  );
};
