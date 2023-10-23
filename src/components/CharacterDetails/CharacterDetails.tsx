import { Autocomplete, Grid, Skeleton, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useRaces } from "../../services/races/races.services";
import { useClasses } from "../../services/classes/classes.service";
import { DataItem } from "../../services/api";
import { getProficiencyBonus, levels } from "../../models/levels.models";

const getInitialValue = (key: string): string => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : "";
};

const setHpValue = (newValue: string, currentValue: string) => {
  const parsedNewValue = Number.parseInt(newValue);

  if (parsedNewValue > 999) return currentValue;

  return newValue;
};

export const CharacterDetails = () => {
  const { races, isFetching: isFetchingRaces } = useRaces();
  const { classes, isFetching: isFetchingClasses } = useClasses();

  const [selectedRace, setSelectedRace] = useState(getInitialValue("race"));
  const [selectedClass, setSelectedClass] = useState(getInitialValue("class"));
  const [selectedLevel, setSelectedLevel] = useState(getInitialValue("level"));

  const [characterName, setCharacterName] = useState(getInitialValue("name"));
  const [currentHp, setCurrentHp] = useState(getInitialValue("currentHp"));
  const [maxHp, setMaxHp] = useState(getInitialValue("maxHp"));
  const [characterRace, setCharacterRace] = useState(getInitialValue("race"));
  const [characterClass, setCharacterClass] = useState(
    getInitialValue("class")
  );
  const [characterLevel, setCharacterLevel] = useState(
    getInitialValue("level")
  );

  return (
    <>
      <Grid container spacing={1} pb={1}>
        <Grid item xs={12} pb={0.5}>
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

        <Grid item xs={3}>
          <Autocomplete
            fullWidth
            value={selectedLevel}
            onChange={(_, newValue) => newValue && setSelectedLevel(newValue)}
            inputValue={characterLevel}
            onInputChange={(_, newValue) => {
              localStorage.setItem("level", JSON.stringify(newValue));
              setCharacterLevel(newValue);
            }}
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
            value={getProficiencyBonus(characterLevel)}
            label="Prof. Bonus"
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={6} display="flex">
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
          {"/br"}
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
        {isFetchingRaces ? (
          <Skeleton width="100%" height="56px" />
        ) : (
          <Autocomplete
            fullWidth
            value={selectedRace}
            onChange={(_, newValue) =>
              setSelectedRace(newValue ?? selectedRace)
            }
            inputValue={characterRace}
            onInputChange={(_, newValue) => {
              localStorage.setItem("race", JSON.stringify(newValue));
              setCharacterRace(newValue);
            }}
            disablePortal
            options={races.map((race) => race.name)}
            renderInput={(params) => (
              <TextField {...params} label="Race" placeholder="Select Race" />
            )}
          />
        )}

        {isFetchingClasses ? (
          <Skeleton width="100%" height="56px" />
        ) : (
          <Autocomplete
            fullWidth
            value={selectedClass}
            onChange={(_, newValue) =>
              setSelectedClass(newValue ?? selectedClass)
            }
            inputValue={characterClass}
            onInputChange={(_, newValue) => {
              localStorage.setItem("class", JSON.stringify(newValue));
              setCharacterClass(newValue);
            }}
            disablePortal
            options={classes.map((classy) => classy.name)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Class"
                placeholder="Select Class"
                onChange={(event) => setCharacterClass(event.target.value)}
              />
            )}
          />
        )}
      </Stack>
    </>
  );
};
