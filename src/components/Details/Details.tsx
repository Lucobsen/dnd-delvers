import { Autocomplete, Grid, Stack, TextField } from "@mui/material";
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

const getInitialValue = (key: string): string => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : "";
};

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

  const [selectedLevel, setSelectedLevel] = useState(
    getInitialValue("level") === "" ? "1" : getInitialValue("level")
  );

  const [characterName, setCharacterName] = useState(getInitialValue("name"));
  const [ac, setAc] = useState(
    getInitialValue("ac") === "" ? "10" : getInitialValue("ac")
  );
  const [currentHp, setCurrentHp] = useState(getInitialValue("currentHp"));
  const [maxHp, setMaxHp] = useState(getInitialValue("maxHp"));

  const onLevelChange = (newValue: string) => {
    localStorage.setItem("level", JSON.stringify(newValue));
    dispatch(updateLevel(newValue));
  };

  const onClassChange = (newValue: string) => {
    localStorage.setItem("class", JSON.stringify(newValue));
    dispatch(updateClass(newValue));
  };

  const onRaceChange = (newValue: string) => {
    localStorage.setItem("race", JSON.stringify(newValue));
    dispatch(updateRace(newValue));
  };

  return (
    <>
      <Grid container spacing={1} pb={1.5}>
        <Grid item xs={9} pb={0.5}>
          <TextField
            fullWidth
            value={characterName}
            label="Name"
            variant="outlined"
            placeholder="Enter Name"
            onChange={(event) => {
              const name = event.target.value;
              localStorage.setItem("name", JSON.stringify(name));
              setCharacterName(name);
            }}
          />
        </Grid>

        <Grid item xs={3} pb={0.5}>
          <TextField
            fullWidth
            value={ac}
            label="AC"
            type="number"
            variant="outlined"
            onChange={(event) => {
              const acValue = event.target.value;
              localStorage.setItem("ac", JSON.stringify(acValue));
              setAc(acValue);
            }}
          />
        </Grid>

        <Grid item xs={3}>
          <Autocomplete
            fullWidth
            value={selectedLevel}
            onChange={(_, newValue) => newValue && setSelectedLevel(newValue)}
            inputValue={level}
            onInputChange={(_, newValue) => onLevelChange(newValue)}
            disablePortal
            options={levels}
            disableClearable
            renderInput={(params) => (
              <TextField {...params} label="Level" placeholder="Select Level" />
            )}
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            fullWidth
            value={proficiencyBonus}
            label="Prof. Bonus"
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            fullWidth
            value={currentHp}
            label="Hp"
            type="number"
            variant="standard"
            onChange={(event) => {
              const newHpValue = setHpValue(event.target.value, currentHp);
              localStorage.setItem("currentHp", JSON.stringify(newHpValue));
              setCurrentHp(newHpValue);
            }}
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            fullWidth
            value={maxHp}
            label="Max Hp"
            type="number"
            variant="standard"
            onChange={(event) => {
              const newHpValue = setHpValue(event.target.value, maxHp);
              localStorage.setItem("maxHp", JSON.stringify(newHpValue));
              setMaxHp(newHpValue);
            }}
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
