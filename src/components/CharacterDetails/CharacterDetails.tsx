import { Autocomplete, Grid, Skeleton, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useRaces } from "../../services/races/races.services";
import { useClasses } from "../../services/classes/classes.service";
import { DataItem } from "../../services/api";
import { getProficiencyBonus, levels } from "../../models/levels.models";

type HP = {
  current: number;
  max: number;
};

const getHpValue = (value: string, currentValue: number) => {
  const numberValue = Number.parseInt(value);

  if (
    numberValue === undefined ||
    numberValue === null ||
    Number.isNaN(numberValue)
  )
    return 0;

  if (numberValue > 999) return currentValue;

  return numberValue;
};

export const CharacterDetails = () => {
  const { races, isFetching: isFetchingRaces } = useRaces();
  const { classes, isFetching: isFetchingClasses } = useClasses();

  const [selectedRace, setSelectedRace] = useState<DataItem | null>(null);
  const [selectedClass, setSelectedClass] = useState<DataItem | null>(null);
  const [selectedLevel, setSelectedLevel] = useState("1");

  const [characterName, setCharacterName] = useState("");
  const [heroHp, setHeroHp] = useState<HP>({
    current: 0,
    max: 0,
  });
  const [characterRace, setCharacterRace] = useState("");
  const [characterClass, setCharacterClass] = useState("");
  const [characterLevel, setCharacterLevel] = useState("1");

  const hpChanged = (value: string) => {
    const parsedString = value.split("/");

    setHeroHp({
      current: getHpValue(parsedString[0], heroHp["current"]),
      max: getHpValue(parsedString[1], heroHp["max"]),
    });
  };

  return (
    <>
      <Grid container spacing={1} pb={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            value={characterName}
            label="Name"
            placeholder="Enter Name"
            variant="outlined"
            onChange={(event) => setCharacterName(event.target.value)}
          />
        </Grid>

        <Grid item xs={3}>
          <Autocomplete
            fullWidth
            value={selectedLevel}
            onChange={(_, newValue) => newValue && setSelectedLevel(newValue)}
            inputValue={characterLevel}
            onInputChange={(_, newValue) => setCharacterLevel(newValue)}
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

        <Grid item xs={6}>
          <TextField
            fullWidth
            value={heroHp["current"] + "/" + heroHp["max"]}
            label="HP/MaxHp"
            variant="outlined"
            onChange={(event) => hpChanged(event.target.value)}
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
            onChange={(_, newValue) => setSelectedRace(newValue)}
            inputValue={characterRace}
            onInputChange={(_, newValue) => setCharacterRace(newValue)}
            disablePortal
            options={races}
            getOptionLabel={(options) => options.name}
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
            onChange={(_, newValue) => setSelectedClass(newValue)}
            inputValue={characterClass}
            onInputChange={(_, newValue) => setCharacterClass(newValue)}
            disablePortal
            options={classes}
            getOptionLabel={(options) => options.name}
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
